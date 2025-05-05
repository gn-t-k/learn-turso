import { TextLink } from "@packages/react-components";
import type { FC } from "react";
import { Link, href } from "react-router";
import { LogoutButton } from "../../../features/authentication/logout-button";

type UserPopoverProps = {
	userId: string;
	userName: string;
};
export const UserPopover: FC<UserPopoverProps> = ({ userId, userName }) => {
	return (
		<div className="grid gap-2">
			<TextLink asChild className="place-self-start">
				<Link to={href("/users/:userId", { userId: userId })}>{userName}</Link>
			</TextLink>
			<ul>
				<li>
					<TextLink asChild>
						<Link
							to={href("/users/:userId/tasks", { userId: userId })}
							prefetch="intent"
						>
							Tasks
						</Link>
					</TextLink>
				</li>
			</ul>
			<LogoutButton className="place-self-end" />
		</div>
	);
};
