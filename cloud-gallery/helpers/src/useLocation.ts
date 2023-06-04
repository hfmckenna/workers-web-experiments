import { useServerData } from "@builder.io/qwik";
import { isBrowser } from "./isBrowser";

export type Location = {
	host: string;
	hostname: string;
	href: string;
	origin: string;
	search: string;
	pathname: string;
	assign: (url: string) => void;
};

// Serious hacks
export function useLocation(): Location {
	if (isBrowser()) {
		return window.location;
	}

	const request = useServerData<Request>("request")!;
	const { host, hostname, href, origin, search, pathname } = new URL(
		request.url
	);
	return { host, hostname, href, origin, search, pathname, assign: () => {} };
}
