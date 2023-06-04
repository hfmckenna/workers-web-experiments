import {
	component$,
	useStore,
	useStylesScoped$,
	$,
	useVisibleTask$,
	useSignal, QwikChangeEvent
} from "@builder.io/qwik";
import { getCookie, saveCookie } from "helpers";
import styles from "./Slider.scss?inline";

export const Slider = component$(() => {
	useStylesScoped$(styles);

	const delay = getCookie("delay") ?? "0";
	const store = useStore<{ delay: string }>({ delay });

	// Handles dragging along the slider, giving real time feedback to the user
	// about the current value
	const handleSliderInput$ = $((e: Event, el: HTMLInputElement) => {
		store.delay = el.value;
	});

	// Fires once the slider stops being dragged
	const handleSliderChange$ = $((e: QwikChangeEvent, el: HTMLInputElement) => {
		store.delay = el.value;
		saveCookie("delay", store.delay);
	});

	const toggleSeams = $((enabled: boolean) => {
		if (enabled) {
			document.body.classList.add("show-seams");
		} else {
			document.body.classList.remove("show-seams");
		}
	});

	const handleShowSeams$ = $((e: QwikChangeEvent, el: HTMLInputElement) => {
		const checked = el.checked;
		saveCookie("seams", JSON.stringify(checked));
		toggleSeams(checked);
	});

	const seamsRef = useSignal<Element>();
	useVisibleTask$(() => {
		if (getCookie("seams") === "true") {
			(seamsRef.value as HTMLInputElement).checked = true;
			toggleSeams(true);
		}
	});

	return (
		<div class="slider-container">
			<div class="slider-content">
				<label class="label" for="delay-slider">
					Gallery List Delay:
				</label>

				<input
					id="delay-slider"
					class="slider"
					type="range"
					min={0}
					max={5}
					step={0.5}
					value={store.delay}
					onChange$={handleSliderChange$}
					onInput$={handleSliderInput$}
				/>

				<span class="label">{store.delay} seconds</span>
			</div>

			<div class="seam-options-container">
				<label class="label" for="enable-seams-input">
					<input
						ref={seamsRef}
						type="checkbox"
						id="enable-seams-input"
						onChange$={handleShowSeams$}
					/>
					Show Seams
				</label>
			</div>
		</div>
	);
});
