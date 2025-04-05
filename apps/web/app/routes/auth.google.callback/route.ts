import { redirect } from "react-router";
import { authenticateByGoogle } from "../auth.google/modules/authenticator.server";
import { saveSession } from "../auth.google/modules/user-session-manager.server";
import type { Route } from "./+types/route";
import { getRedirectTo } from "./modules/redirect-manager.server";

export const loader = async ({ request }: Route.LoaderArgs) => {
	const user = await authenticateByGoogle(request);

	const headers = await saveSession(request)(user);
	const href = await getRedirectTo(request);

	return redirect(href ?? "/", { headers });
};
