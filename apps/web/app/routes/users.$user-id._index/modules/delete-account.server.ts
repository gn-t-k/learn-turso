import { database, eq, tables } from "@packages/database";
import { ErrorFactory } from "@praha/error-factory";

export type DeleteAccountError = UserNotFoundError;
class UserNotFoundError extends ErrorFactory({
	name: "UserNotFoundError",
	message: "存在しないユーザーのIDが指定されました",
}) {}

type DeleteAccount = (userId: string) => Promise<void>;
export const deleteAccount: DeleteAccount = async (userId) => {
	const [user] = await database
		.select({ id: tables.users.id })
		.from(tables.users)
		.where(eq(tables.users.id, userId));

	if (user === undefined) {
		throw new UserNotFoundError();
	}

	await database.transaction(async (tx) => {
		await tx.delete(tables.tasks).where(eq(tables.tasks.ownerId, userId));
		await tx
			.delete(tables.userAuthenticatedEvents)
			.where(eq(tables.userAuthenticatedEvents.userId, userId));
		await tx.delete(tables.users).where(eq(tables.users.id, userId));
	});
};
