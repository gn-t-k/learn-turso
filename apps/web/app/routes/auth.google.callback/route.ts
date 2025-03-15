import { redirect } from "react-router";
import { authenticateByGoogle } from "../auth.google/authenticator.server";
import { saveSession } from "../auth.google/user-session-manager.server";
import type { Route } from "./+types/route";
import { getRedirectTo } from "./redirect-manager";

export const loader = async ({ request }: Route.LoaderArgs) => {
	const user = await authenticateByGoogle(request);

	const headers = await saveSession(request)(user);
	const href = await getRedirectTo(request);

	return redirect(href ?? "/", { headers });
};
