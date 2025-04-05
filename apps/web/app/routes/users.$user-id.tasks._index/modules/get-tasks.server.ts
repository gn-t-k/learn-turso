import { eq, getDatabase } from "@packages/database";
import { tasks as tasksTable } from "@packages/database/src/tables/tasks";

type GetTasks = (ownerId: string) => Promise<Task[]>;
type Task = {
	id: string;
	title: string;
	completed: boolean;
};
export const getTasks: GetTasks = async (ownerId) => {
	const database = getDatabase();
	const tasks = await database
		.select({
			id: tasksTable.id,
			title: tasksTable.title,
			completed: tasksTable.completed,
		})
		.from(tasksTable)
		.where(eq(tasksTable.ownerId, ownerId));

	await new Promise((resolve) => setTimeout(resolve, 1000));

	return tasks;
};
