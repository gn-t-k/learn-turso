import {
	Button,
	Popover,
	PopoverDialog,
	PopoverTrigger,
} from "@packages/react-components";
import type { FC } from "react";
import { Link, Outlet, href } from "react-router";
import { getSessionUser } from "../../features/authentication/user-session-storage.server";
import type { Route } from "./+types/layout";
import { AppLogotype } from "./modules/app-logotype";
import { StickyHeader } from "./modules/sticky-header";
import { UserIconButton } from "./modules/user-icon-button";
import { UserPopover } from "./modules/user-popover";

export const loader = async ({ request }: Route.LoaderArgs) => {
	const sessionUser = await getSessionUser(request);

	return { sessionUser };
};

const Layout: FC<Route.ComponentProps> = ({ loaderData }) => {
	const { sessionUser } = loaderData;

	return (
		<div className="grid min-h-screen grid-rows-[auto_1fr]">
			<StickyHeader className="grid grid-flow-col items-center justify-between">
				<AppLogotype />

				{sessionUser === undefined ? (
					<Button variant="outline" asChild>
						<Link to={href("/login")}>ログイン</Link>
					</Button>
				) : (
					<PopoverTrigger>
						<UserIconButton
							userName={sessionUser.name}
							userImageUrl={sessionUser.imageUrl}
						/>
						<Popover>
							<PopoverDialog className="w-3xs">
								<UserPopover
									userId={sessionUser.id}
									userName={sessionUser.name}
								/>
							</PopoverDialog>
						</Popover>
					</PopoverTrigger>
				)}
			</StickyHeader>
			<Outlet />
		</div>
	);
};
export default Layout;
