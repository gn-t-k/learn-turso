import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Button,
	Popover,
	PopoverDialog,
	PopoverTrigger,
	buttonVariants,
} from "@packages/react-components";
import type { FC } from "react";
import { Form, Link, Outlet, href } from "react-router";
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
					<Link
						to={href("/login")}
						className={buttonVariants({ variant: "link" })}
					>
						ログイン
					</Link>
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
							<PopoverDialog className="grid gap-4">
								<span>{sessionUser?.name}</span>
								<Link to={href("/users/:userId", { userId: sessionUser.id })}>
									マイページ
								</Link>
								<Link
									to={href("/users/:userId/tasks", { userId: sessionUser.id })}
								>
									タスク一覧
								</Link>
								<Form method="GET" action={href("/logout")}>
									<Button type="submit" variant="outline">
										ログアウト
									</Button>
								</Form>
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
