import { Button } from "@packages/react-components";
import type { ComponentProps, FC } from "react";
import { Link, href } from "react-router";

type GoogleLoginButtonProps = ComponentProps<"button">;
export const GoogleLoginButton: FC<GoogleLoginButtonProps> = (props) => {
	return (
		<Button variant="outline" {...props} asChild>
			<Link to={href("/auth/google")}>Login with Google</Link>
		</Button>
	);
};
