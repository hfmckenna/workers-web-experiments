import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./Body.css?inline";

export default component$(() => {
	useStylesScoped$(styles);

	return <div class="content"></div>;
});
