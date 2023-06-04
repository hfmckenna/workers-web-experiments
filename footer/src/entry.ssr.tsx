import { manifest } from "@qwik-client-manifest";
import { Footer } from "./root";
import { renderResponse } from "@hfmckenna/skran-app-tools";

export default {
	fetch(request: Request, env: Record<string, unknown>): Promise<Response> {
		return renderResponse(request, env, <Footer />, manifest, "footer");
	},
};
