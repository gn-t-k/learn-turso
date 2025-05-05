import { eq, factories, resetTables, tables } from "@packages/database";
import { withTestDb } from "app/helpers/with-test-db";
import { beforeEach, describe, expect, test } from "vitest";
import { deleteAccount } from "./delete-account.server";

describe("deleteAccount", () => {
	beforeEach(async () => {
		await resetTables();
	});

	describe("指定したユーザーIDのユーザーが存在する場合、", async () => {
		await withTestDb(async (database) => {
			const [userToDelete, otherUser] = await factories
				.users(database)
				.create(2);
			await Promise.all([
				factories
					.tasks(database)
					.create([
						{ ownerId: userToDelete.id },
						{ ownerId: userToDelete.id },
						{ ownerId: otherUser.id },
					]),
				factories
					.userAuthenticatedEvents(database)
					.create([
						{ userId: userToDelete.id },
						{ userId: userToDelete.id },
						{ userId: otherUser.id },
					]),
			]);

			await deleteAccount(userToDelete.id);

			const deletedUserResult = await database
				.select()
				.from(tables.users)
				.where(eq(tables.users.id, userToDelete.id));
			test("ユーザーが削除されている", () => {
				expect(deletedUserResult).toHaveLength(0);
			});

			const deletedTasksResult = await database
				.select()
				.from(tables.tasks)
				.where(eq(tables.tasks.ownerId, userToDelete.id));
			test("ユーザーのタスクが削除されている", () => {
				expect(deletedTasksResult).toHaveLength(0);
			});

			const deletedAuthEventsResult = await database
				.select()
				.from(tables.userAuthenticatedEvents)
				.where(eq(tables.userAuthenticatedEvents.userId, userToDelete.id));
			test("ユーザーの認証イベントが削除されている", () => {
				expect(deletedAuthEventsResult).toHaveLength(0);
			});

			const otherUserResult = await database
				.select()
				.from(tables.users)
				.where(eq(tables.users.id, otherUser.id));
			test("他のユーザーは削除されていない", () => {
				expect(otherUserResult).toHaveLength(1);
				expect(otherUserResult[0]).toEqual(otherUser);
			});

			const otherTaskResult = await database
				.select()
				.from(tables.tasks)
				.where(eq(tables.tasks.ownerId, otherUser.id));
			test("他のユーザーのタスクは削除されていない", () => {
				expect(otherTaskResult).toEqual([
					expect.objectContaining({ ownerId: otherUser.id }),
				]);
			});

			const otherAuthEventResult = await database
				.select()
				.from(tables.userAuthenticatedEvents)
				.where(eq(tables.userAuthenticatedEvents.userId, otherUser.id));
			test("他のユーザーの認証イベントは削除されていない", () => {
				expect(otherAuthEventResult).toEqual([
					expect.objectContaining({ userId: otherUser.id }),
				]);
			});
		});
	});

	describe("存在しないユーザーIDを指定した場合", () => {
		const nonExistentUserId = "non-existent-user-id";

		test("例外が投げられる", async () => {
			await withTestDb(async () => {
				await expect(deleteAccount(nonExistentUserId)).rejects.toThrowError(
					"存在しないユーザーのIDが指定されました",
				);
			});
		});
	});
});
