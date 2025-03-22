import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@packages/react-components";
import type { FC } from "react";
import { Form, data, href } from "react-router";
import {
	redirectToSearchParams,
	setRedirectTo,
} from "../auth.google.callback/redirect-manager";
import type { Route } from "./+types/route";

export const loader = async ({ request }: Route.LoaderArgs) => {
	const url = new URL(request.url);
	const redirectTo = url.searchParams.get(redirectToSearchParams) || "/";
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
					<Form action={href("/auth/google")} method="GET">
						<Button className="w-full" type="submit">
							Login with Google
						</Button>
					</Form>
				</CardContent>
			</Card>
		</main>
	);
};
export default Page;
