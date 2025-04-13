import {
	Button,
	DialogContent,
	DialogOverlay,
	DialogTrigger,
} from "@packages/react-components";
import { cn } from "@packages/react-components/src/utilities/cn";
import type { FC } from "react";
import type { Route } from "./+types/route";
import { findUser } from "./modules/find-user.server";

export const loader = async ({ params }: Route.LoaderArgs) => {
	const user = await findUser(params.userId);
	if (!user) {
		throw new Response(null, { status: 404, statusText: "Not Found" });
	}

	return { user };
};

const Page: FC<Route.ComponentProps> = ({ loaderData }) => {
	const { user } = loaderData;

	return (
		<main className="grid auto-rows-min gap-4 p-4">
			<h1>{user.name}</h1>
			<p>ID: {user.id}</p>
			<DialogTrigger>
				<Button variant="outline">Delete account</Button>
				<DialogOverlay>
					<DialogContent role="alertdialog">
						{({ close }) => {
							return (
								<div className="grid gap-4">
									<p>Are you sure you want to delete your account?</p>
									<div
										className={cn([
											"grid justify-items-stretch gap-2",
											"sm:grid-flow-col sm:justify-end sm:justify-items-start",
										])}
									>
										<Button onClick={close} variant="outline">
											Cancel
										</Button>
										<Button
											variant="destructive"
											onClick={() => {
												/* handle delete logic */
											}}
										>
											Delete
										</Button>
									</div>
								</div>
							);
						}}
					</DialogContent>
				</DialogOverlay>
			</DialogTrigger>
		</main>
	);
};
export default Page;
