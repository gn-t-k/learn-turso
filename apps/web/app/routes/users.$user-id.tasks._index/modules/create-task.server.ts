import { database, eq, tables } from "@packages/database";
import { ErrorFactory } from "@praha/error-factory";
import { ulid } from "ulid";

export type CreateTaskError = UserNotFoundError;
class UserNotFoundError extends ErrorFactory({
	name: "UserNotFoundError",
	message: "存在しないユーザーのIDが指定されました",
}) {}

type CreateTask = (props: { userId: string; title: string }) => Promise<void>;
export const createTask: CreateTask = async ({ userId, title }) => {
	const [user] = await database
		.select({ id: tables.users.id })
		.from(tables.users)
		.where(eq(tables.users.id, userId));

	if (user === undefined) {
		throw new UserNotFoundError();
	}

	const taskId = ulid();
	const now = new Date();

	await database.insert(tables.tasks).values({
		id: taskId,
		title,
		completed: false,
		ownerId: userId,
		createdAt: now,
		updatedAt: now,
	});
};
