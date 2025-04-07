import { redirect } from "react-router";
import { authenticateByGoogle } from "../../features/authentication/authenticator.server";
import { getRedirectTo } from "../../features/authentication/redirect-cookie.server";
import { saveSession } from "../../features/authentication/user-session-storage.server";
import type { Route } from "./+types/route";

export const loader = async ({ request }: Route.LoaderArgs) => {
	const user = await authenticateByGoogle(request);

	const headers = await saveSession(request)(user);
	const href = await getRedirectTo(request);

	return redirect(href ?? "/", { headers });
};
