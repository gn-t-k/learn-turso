import type { FC } from "react";
import type { Route } from "./+types/route";
import { findUser } from "./modules/find-user.server";

export const loader = async ({ params }: Route.LoaderArgs) => {
	const user = await findUser(params.userId);
	if (!user) {
		throw new Response(null, { status: 404, statusText: "Not Found" });
	}

	return { user };
};

const Page: FC<Route.ComponentProps> = ({ loaderData }) => {
	const { user } = loaderData;

	return (
		<main className="p-4">
			<h1>{user.name}</h1>
			<p>ID: {user.id}</p>
		</main>
	);
};
export default Page;
