import { parseWithValibot } from "@conform-to/valibot";
import { type FC, Suspense } from "react";
import { getSessionUser } from "../../features/authentication/user-session-storage.server";
import type { Route } from "./+types/route";
import { createTask } from "./modules/create-task.server";
import { getTasks } from "./modules/get-tasks.server";
import { TaskForm, taskFormSchema } from "./modules/task-form";
import { TaskList, TaskListSkeleton } from "./modules/task-list";

export const loader = ({ params }: Route.LoaderArgs) => {
	const tasksPromise = getTasks(params.userId);

	return { tasksPromise };
};

const Page: FC<Route.ComponentProps> = ({ loaderData }) => {
	const { tasksPromise } = loaderData;

	return (
		<main>
			<h1>Tasks</h1>
			<TaskForm actionType="create-task" />
			<Suspense fallback={<TaskListSkeleton />}>
				<TaskList tasksPromise={tasksPromise} />
			</Suspense>
		</main>
	);
};
export default Page;

export const ErrorBoundary: FC<Route.ErrorBoundaryProps> = ({ error }) => {
	return (
		<main>
			<h1>エラーが発生しました</h1>
			<p>
				{error instanceof Error
					? error.message
					: "不明なエラーが発生しました。"}
			</p>
		</main>
	);
};

export const action = async ({ request, params }: Route.ActionArgs) => {
	const sessionUser = await getSessionUser(request);
	if (sessionUser?.id !== params.userId) {
		throw new Response(null, { status: 403, statusText: "Forbidden" });
	}

	const formData = await request.formData();
	const actionType = formData.get("actionType");

	switch (actionType) {
		case "create-task": {
			const submission = parseWithValibot(formData, { schema: taskFormSchema });

			if (submission.status !== "success") {
				return {
					submissionResult: submission.reply(),
				};
			}

			await createTask({
				userId: params.userId,
				title: submission.value.title,
			});

			return {
				submissionResult: submission.reply({ resetForm: true }),
			};
		}
		case "update-task": {
			return new Response("Not Implemented", { status: 501 });
		}
		default: {
			return new Response("Bad Request", { status: 400 });
		}
	}
};
