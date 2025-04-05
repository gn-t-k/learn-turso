import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Button,
	Popover,
	PopoverDialog,
	PopoverTrigger,
	TextLink,
} from "@packages/react-components";
import type { FC } from "react";
import { Link, Outlet, href } from "react-router";
import { getSessionUser } from "../auth.google/modules/user-session-manager.server";
import type { Route } from "./+types/layout";
import { AppLogoType } from "./modules/app-logo-type";
import { HeaderContainer } from "./modules/header-container";
import { HeaderLayout } from "./modules/header-layout";

export const loader = async ({ request }: Route.LoaderArgs) => {
	const sessionUser = await getSessionUser(request);

	return { sessionUser };
};

const Layout: FC<Route.ComponentProps> = ({ loaderData }) => {
	const { sessionUser } = loaderData;

	return (
		<HeaderLayout>
			<HeaderContainer className="grid grid-flow-col items-center justify-between">
				<AppLogoType />
				{sessionUser === undefined ? (
					<Button variant="outline" asChild>
						<Link to={href("/login")}>ログイン</Link>
					</Button>
				) : (
					<UserPopover
						id={sessionUser.id}
						name={sessionUser.name}
						imageUrl={sessionUser.imageUrl}
					/>
				)}
			</HeaderContainer>
			<Outlet />
		</HeaderLayout>
	);
};
export default Layout;

type UserPopoverProps = {
	id: string;
	name: string;
	imageUrl: string;
};
export const UserPopover: FC<UserPopoverProps> = ({ id, name, imageUrl }) => {
	return (
		<PopoverTrigger>
			<Button variant="ghost" size="icon" aria-label={name ?? "user"}>
				<Avatar>
					<AvatarImage src={imageUrl} alt={name} />
					<AvatarFallback>{name}</AvatarFallback>
				</Avatar>
			</Button>
			<Popover>
				<PopoverDialog className="grid w-3xs gap-4">
					<span>{name}</span>
					<ul>
						<li>
							<TextLink asChild>
								<Link to={href("/users/:userId", { userId: id })}>
									マイページ
								</Link>
							</TextLink>
						</li>
						<li>
							<TextLink asChild>
								<Link
									to={href("/users/:userId/tasks", {
										userId: id,
									})}
									prefetch="viewport"
								>
									タスク一覧
								</Link>
							</TextLink>
						</li>
					</ul>
					<Button variant="outline" asChild>
						<Link to={href("/logout")} className="place-self-end">
							ログアウト
						</Link>
					</Button>
				</PopoverDialog>
			</Popover>
		</PopoverTrigger>
	);
};
