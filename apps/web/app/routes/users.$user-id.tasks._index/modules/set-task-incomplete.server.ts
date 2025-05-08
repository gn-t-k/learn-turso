import { database, eq, tables } from "@packages/database";
import { ErrorFactory } from "@praha/error-factory";

export type SetTaskIncompleteError = TaskNotFoundError;
class TaskNotFoundError extends ErrorFactory({
	name: "TaskNotFoundError",
	message: "存在しないタスクのIDが指定されました",
}) {}

type SetTaskIncomplete = (taskId: string) => Promise<void>;
export const setTaskIncomplete: SetTaskIncomplete = async (taskId) => {
	const [task] = await database
		.select({ id: tables.tasks.id })
		.from(tables.tasks)
		.where(eq(tables.tasks.id, taskId));

	if (task === undefined) {
		throw new TaskNotFoundError();
	}

	const now = new Date();
	await database
		.update(tables.tasks)
		.set({ completed: false, updatedAt: now })
		.where(eq(tables.tasks.id, taskId));
};
