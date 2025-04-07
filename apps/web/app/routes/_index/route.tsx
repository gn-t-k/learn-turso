import { href, redirect } from "react-router";
import { getSessionUser } from "../../features/authentication/user-session-storage.server";
import type { Route } from "./+types/route";

export const loader = async ({ request }: Route.LoaderArgs) => {
	const sessionUser = await getSessionUser(request);

	return redirect(
		sessionUser === undefined
			? href("/login")
			: href("/users/:userId", { userId: sessionUser.id }),
	);
};
