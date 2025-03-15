import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@packages/react-components";
import type { FC } from "react";
import { data } from "react-router";
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
		<Card>
			<CardHeader>
				<CardTitle>Card Title</CardTitle>
				<CardDescription>Card Description</CardDescription>
			</CardHeader>
			<CardContent>
				<p>Card Content</p>
			</CardContent>
			<CardFooter>
				<p>Card Footer</p>
			</CardFooter>
		</Card>
	);
};
export default Page;
