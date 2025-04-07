import { href, redirect } from "react-router";
import { destroySession } from "../../features/authentication/user-session-storage.server";
import { redirectSearchParameter } from "../login._index/route";
import type { Route } from "./+types/route";

export const loader = async ({ request }: Route.LoaderArgs) => {
	const url = new URL(request.url);
	const redirectTo = url.searchParams.get(redirectSearchParameter) || "/";
	const params = new URLSearchParams({
		[redirectSearchParameter]: redirectTo,
	}).toString();

	const headers = await destroySession(request);

	return redirect(`${href("/login")}?${params}`, { headers });
};
