import {
	component$,
	useStylesScoped$,
	useStore,
	$,
	useOnDocument, useSignal, Signal,
} from "@builder.io/qwik";
import styles from "./Filter.css?inline";
import { tags } from "../../constants";
import { useLocation, isBrowser } from "helpers";
interface State {
	inputValue: string;
	searchResults: string[];
}

export const findTags = (query: string): string[] => {
	return tags.reduce<string[]>(
		(acc, tag) => (tag.indexOf(query) !== -1 ? [...acc, tag] : [...acc]),
		[]
	);
};

export const Filter = component$(() => {
	useStylesScoped$(styles);

	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const initialValue = queryParams.get("tag") ?? "";

	const state = useStore<State>(
		{
			inputValue: initialValue,
			searchResults: [],
		},
		{ deep: true }
	);

	const listRef = useSignal<Element>();
	const containerRef = useSignal<Element>();

	// Dismiss the results after clicking outside
	useOnDocument(
		"click",
		$((event) => {
			if (!containerRef.value || !event.target) return;

			if (!containerRef.value.contains(event.target as Node)) {
				state.searchResults = [];
			}
		})
	);

	return (
		<div ref={containerRef}>
			<div>
				<input
					preventdefault:keyup
					tabIndex={0}
					autoFocus={true}
					autoCorrect="off"
					autoComplete="off"
					autoCapitalize="off"
					class="input"
					type="text"
					placeholder="Search by tag (ex. classic)"
					onKeyUp$={(ev) => {
						const currentValue = (ev.target as HTMLInputElement).value;

						if (ev.key === "ArrowDown") {
							const firstLink = listRef.value?.querySelector(
								`:first-child > a`
							) as HTMLAnchorElement;
							firstLink.focus();
							return;
						}

						if (ev.key === "Enter") {
							if (state.searchResults.length === 1) {
								state.inputValue = state.searchResults[0];
								const firstLink = listRef.value?.querySelector(
									`:first-child > a`
								) as HTMLAnchorElement;
								firstLink.click();
								return;
							}

							if (currentValue === "") {
								if (isBrowser()) {
									window.location.assign("/");
								}
								return;
							}
						}
						if (currentValue === "") {
							state.searchResults = [];
						} else {
							state.searchResults = findTags(currentValue);
						}

						// Populate the input with the full selected value
						state.inputValue = currentValue;
					}}
					value={state.inputValue}
				/>
			</div>
			<SearchResults listRef={listRef} state={state}></SearchResults>
		</div>
	);
});

export const SearchResults = component$(
	(props: { state: State; listRef: Signal<Element | undefined> }) => {
		useStylesScoped$(styles);

		const searchResults = props.state.searchResults;

		const getListElement = $((i: number) => {
			return props.listRef.value?.querySelector(
				`:nth-child(${i + 1}) > a`
			) as HTMLAnchorElement;
		});

		return searchResults?.length ? (
			<ul class="result-list" ref={props.listRef}>
				{searchResults.map((result, i) => {
					return (
						<li
							preventdefault:keydown
							class="result-list-item"
							onKeyDown$={async (ev) => {
								if (ev.key === "ArrowDown") {
									if (i === searchResults.length - 1) return;
									const element = await getListElement(i + 1);
									element.focus();
								} else if (ev.key === "ArrowUp") {
									if (i === 0) return;
									const element = await getListElement(i - 1);
									element.focus();
								}
							}}
							onClick$={() => {
								props.state.searchResults = [];
								props.state.inputValue = result;
							}}
						>
							<a class="link" href={`?tag=${result}`}>
								{result}
							</a>
						</li>
					);
				})}
			</ul>
		) : null;
	}
);
