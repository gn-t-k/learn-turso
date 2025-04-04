import type { FC } from "react";
import { href } from "react-router";
import { getSessionUser } from "../auth.google/user-session-manager.server";
import type { Route } from "./+types/route";
import { findUser } from "./find-user.server";

export const loader = async ({ request, params }: Route.LoaderArgs) => {
	const user = await findUser(params.userId);
	if (!user) {
		throw new Response(null, { status: 404, statusText: "Not Found" });
	}

	const sessionUser = await getSessionUser(request);
	const isOwnPage = sessionUser?.id === params.userId;

	return { user, isOwnPage };
};

const Page: FC<Route.ComponentProps> = ({ loaderData }) => {
	const { user, isOwnPage } = loaderData;
	const _params = new URLSearchParams({
		redirect_to: href("/users/:userId", { userId: user.id }),
	}).toString();

	return (
		<main>
			<h1>{user.name}</h1>
			<p>ID: {user.id}</p>
		</main>
	);
};
export default Page;
