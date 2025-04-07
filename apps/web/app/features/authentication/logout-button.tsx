import { Button } from "@packages/react-components";
import type { ComponentProps, FC } from "react";
import { Link, href } from "react-router";

type LogoutButtonProps = ComponentProps<"button">;
export const LogoutButton: FC<LogoutButtonProps> = (props) => {
	return (
		<Button variant="outline" {...props} asChild>
			<Link to={href("/logout")}>Logout</Link>
		</Button>
	);
};
