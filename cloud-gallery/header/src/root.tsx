import {$, component$, useStylesScoped$} from "@builder.io/qwik";
import { Image, useFragmentRoot } from "helpers";
import styles from "./Header.css?inline";
import { Slider } from "./Slider/Slider";

export const Header = component$(() => {
	useStylesScoped$(styles);
	useFragmentRoot();
	const putRecipe = $(async () => {
		await fetch('https://author-bff.test.admin.skran.app/v1/recipes', {
			method: 'PUT',
			body: JSON.stringify({
				"detail": {
					"state": "published"
				}
			}),
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer qke7sqgtkdie'
			}
		})
	})
	return (
		<>
			<Slider />
			<div class="container">
				<Image alt="Cloudflare logo" src="cf-logo.png" width="74" height="35" />
				<div class="title">Cloud Gallery</div>
				<button onClick$={putRecipe}>PUT ME!</button>

				<a href="https://github.com/cloudflare/workers-web-experiments/tree/main/cloud-gallery">
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
