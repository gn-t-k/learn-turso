import {
	Button,
	DialogContent,
	DialogOverlay,
	DialogTrigger,
} from "@packages/react-components";
import type { FC } from "react";
import { href, redirect, useFetcher } from "react-router";
import { getSessionUser } from "../../features/authentication/user-session-storage.server";
import type { Route } from "./+types/route";
import { DeleteAccountConfirmDialog } from "./modules/delete-account-confirm-dialog";
import { deleteAccount } from "./modules/delete-account.server";
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
	const fetcher = useFetcher();

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
								<DeleteAccountConfirmDialog
									busy={fetcher.state !== "idle"}
									close={close}
									deleteAccount={() => fetcher.submit({}, { method: "POST" })}
								/>
							);
						}}
					</DialogContent>
				</DialogOverlay>
			</DialogTrigger>
		</main>
	);
};
export default Page;

export const action = async ({ request, params }: Route.ActionArgs) => {
	const sessionUser = await getSessionUser(request);

	if (sessionUser?.id !== params.userId) {
		throw new Response(null, { status: 403, statusText: "Forbidden" });
	}

	await deleteAccount(params.userId);

	return redirect(href("/logout"));
};
