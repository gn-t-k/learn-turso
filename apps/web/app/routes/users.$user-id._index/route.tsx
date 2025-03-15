import type { FC } from "react";
import { Link, href } from "react-router";
import { redirectToSearchParams } from "../auth.google.callback/redirect-manager";
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
	const params = new URLSearchParams({
		[redirectToSearchParams]: `/users/${user.id}`,
	}).toString();

	return (
		<main>
			<h1>{user.name}</h1>
			<p>ID: {user.id}</p>
			<Link to={href("/users/:userId/tasks", { userId: user.id })}>
				タスク一覧
			</Link>
			{isOwnPage && <Link to={`${href("/logout")}?${params}`}>ログアウト</Link>}
		</main>
	);
};
export default Page;
