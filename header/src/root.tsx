import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { Image, useFragmentRoot } from "@hfmckenna/skran-app-tools";
import styles from "./Header.css?inline";

export const Header = component$(() => {
	useStylesScoped$(styles);
	useFragmentRoot();
	return (
		<>
			<div class="container">
				<Image alt="Cloudflare logo" src="cf-logo.png" width="74" height="35" />
				<div class="title">Cloud Gallery</div>
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
