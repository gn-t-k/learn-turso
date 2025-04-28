import { database, eq, tables } from "@packages/database";
import { ErrorFactory } from "@praha/error-factory";

export type GetTasksError = UserNotFoundError;
class UserNotFoundError extends ErrorFactory({
	name: "UserNotFoundError",
	message: "存在しないユーザーのIDが指定されました",
}) {}

type GetTasks = (ownerId: string) => Promise<Task[]>;
type Task = {
	id: string;
	title: string;
	completed: boolean;
};
export const getTasks: GetTasks = async (ownerId) => {
	const [user] = await database
		.select({ id: tables.users.id, name: tables.users.name })
		.from(tables.users)
		.where(eq(tables.users.id, ownerId));
	if (user === undefined) {
		throw new UserNotFoundError();
	}

	const tasks = await database
		.select({
			id: tables.tasks.id,
			title: tables.tasks.title,
			completed: tables.tasks.completed,
		})
		.from(tables.tasks)
		.where(eq(tables.tasks.ownerId, ownerId));

	return tasks;
};
