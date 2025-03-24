import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@packages/react-components";
import type { FC } from "react";
import { Outlet } from "react-router";
import { getSessionUser } from "../auth.google/user-session-manager.server";
import type { Route } from "./+types/layout";

export const loader = async ({ request, params }: Route.LoaderArgs) => {
	const user = await getSessionUser(request);

	return { user };
};

const Layout: FC<Route.ComponentProps> = ({ loaderData }) => {
	const { user } = loaderData;

	return (
		<div className="grid min-h-screen grid-rows-[auto_1fr]">
			<header className="sticky top-0 z-10 grid grid-flow-col grid-cols-[1fr_auto] bg-white p-4 shadow-md">
				<span className="font-bold text-xl">TODO app</span>
				<Avatar>
					<AvatarImage src="" alt={user?.name} />
					<AvatarFallback>{user?.name}</AvatarFallback>
				</Avatar>
			</header>
			<Outlet />
		</div>
	);
};
export default Layout;
