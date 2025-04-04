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
import { getSessionUser } from "../auth.google/user-session-manager.server";
import type { Route } from "./+types/layout";

export const loader = async ({ request }: Route.LoaderArgs) => {
	const sessionUser = await getSessionUser(request);

	return { sessionUser };
};

const Layout: FC<Route.ComponentProps> = ({ loaderData }) => {
	const { sessionUser } = loaderData;

	return (
		<div className="grid min-h-screen grid-rows-[auto_1fr]">
			<header className="sticky top-0 z-10 grid grid-flow-col grid-cols-[1fr_auto] items-center bg-white p-4 shadow-md">
				<span className="font-bold text-xl">TODO app</span>
				{sessionUser === undefined ? (
					<Button variant="outline" asChild>
						<Link to={href("/login")}>ログイン</Link>
					</Button>
				) : (
					<PopoverTrigger>
						<Button
							variant="ghost"
							size="icon"
							aria-label={sessionUser?.name ?? "user"}
						>
							<Avatar>
								<AvatarImage
									src={sessionUser?.imageUrl}
									alt={sessionUser?.name}
								/>
								<AvatarFallback>{sessionUser?.name}</AvatarFallback>
							</Avatar>
						</Button>
						<Popover>
							<PopoverDialog className="grid w-3xs gap-4">
								<span>{sessionUser.name}</span>
								<ul>
									<li>
										<TextLink asChild>
											<Link
												to={href("/users/:userId", { userId: sessionUser.id })}
											>
												マイページ
											</Link>
										</TextLink>
									</li>
									<li>
										<TextLink asChild>
											<Link
												to={href("/users/:userId/tasks", {
													userId: sessionUser.id,
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
				)}
			</header>
			<Outlet />
		</div>
	);
};
export default Layout;
