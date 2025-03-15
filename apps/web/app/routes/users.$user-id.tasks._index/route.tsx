import { type FC, Suspense } from "react";
import type { Route } from "./+types/route";
import { getTasks } from "./get-tasks.server";
import { TaskList, TaskListSkeleton } from "./task-list";

export const loader = ({ params }: Route.LoaderArgs) => {
	const tasksPromise = getTasks(params.userId);

	return { tasksPromise };
};

const Page: FC<Route.ComponentProps> = ({ loaderData }) => {
	const { tasksPromise } = loaderData;

	return (
		<main>
			<h1>Tasks</h1>
			<Suspense fallback={<TaskListSkeleton />}>
				<TaskList tasksPromise={tasksPromise} />
			</Suspense>
		</main>
	);
};
export default Page;
