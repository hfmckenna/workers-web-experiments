import { $, component$, useStylesScoped$ } from "@builder.io/qwik";
import { Image, useFragmentRoot } from "@hfmckenna/skran-app-tools";
import styles from "./Header.css?inline";

export const Header = component$(() => {
	useStylesScoped$(styles);
	useFragmentRoot();
	const putRecipe = $(async () => {
		const token = document.cookie.split("; ");
		const tokenCookie = token.find((row) =>
			row.startsWith("CF_Authorization=")
		);
		const tokenValue = tokenCookie?.split("=")[1];
		await fetch("https://author-bff.test.admin.skran.app/v1/recipes", {
			method: "PUT",
			body: JSON.stringify({
				detail: {
					state: "published",
				},
			}),
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + tokenValue,
			},
		});
	});
	return (
		<>
			<div class="container">
				<Image alt="Cloudflare logo" src="cf-logo.png" width="74" height="35" />
				<div class="title">Cloud Gallery</div>
				<button onClick$={putRecipe}>PUT ME!</button>

				<a href="https://github.com/cloudflare/workers-web-experiments/tree/main/qwik-workers">
					<Image
						alt="Github icon"
						aria-label="Link to Github repository"
						width="35px"
						height="35px"
						src="github-icon.svg"
					/>
				</a>
			</div>
		</>
	);
});
