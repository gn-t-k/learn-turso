import {
	Popover,
	PopoverDialog,
	PopoverTrigger,
	TextLink,
} from "@packages/react-components";
import type { FC, ReactElement } from "react";
import { Link, href } from "react-router";
import { LogoutButton } from "../../../features/authentication/logout-button";

type UserPopoverProps = {
	userId: string;
	userName: string;
	trigger: ReactElement;
};
export const UserPopover: FC<UserPopoverProps> = ({
	userId,
	userName,
	trigger,
}) => {
	return (
		<PopoverTrigger>
			{trigger}
			<Popover>
				<PopoverDialog className="grid w-3xs gap-4">
					<TextLink asChild className="place-self-start">
						<Link to={href("/users/:userId", { userId: userId })}>
							{userName}
						</Link>
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
				</PopoverDialog>
			</Popover>
		</PopoverTrigger>
	);
};
