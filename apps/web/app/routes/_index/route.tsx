import { href, redirect } from "react-router";
import { getSessionUser } from "../auth.google/user-session-manager.server";
import type { Route } from "./+types/route";

export const loader = async ({ request }: Route.LoaderArgs) => {
	const sessionUser = await getSessionUser(request);

	return redirect(
		sessionUser === undefined
			? href("/login")
			: href("/users/:userId", { userId: sessionUser.id }),
	);
};
