import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@packages/react-components";
import type { FC } from "react";
import { data } from "react-router";
import { GoogleLoginButton } from "../../features/authentication/google-login-button";
import { setRedirectTo } from "../../features/authentication/redirect-cookie.server";
import type { Route } from "./+types/route";

export const redirectSearchParameter = "redirect_to";

export const loader = async ({ request }: Route.LoaderArgs) => {
	const url = new URL(request.url);
	const redirectTo = url.searchParams.get(redirectSearchParameter) || "/";
	const headers = await setRedirectTo(redirectTo);

	return data(null, { headers });
};

const Page: FC<Route.ComponentProps> = () => {
	return (
		<main className="grid h-screen place-items-center p-8">
			<Card className="w-sm min-w-xs">
				<CardHeader>
					<CardTitle>Login</CardTitle>
					<CardDescription>
						Welcome to our application. Log in with your Google account to
						access your personalized features.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<GoogleLoginButton className="w-full" />
				</CardContent>
			</Card>
		</main>
	);
};
export default Page;
