import { eq, factories, resetTables, tables } from "@packages/database";
import { withTestDb } from "app/helpers/with-test-db";
import { beforeEach, describe, expect, test } from "vitest";
import { deleteUser } from "./delete-user.server";

describe("deleteUser", () => {
	beforeEach(async () => {
		await resetTables();
	});

	test("指定したユーザーIDのユーザーが存在する場合、ユーザーとその関連データが削除される", async () => {
		await withTestDb(async (database) => {
			const [userToDelete, otherUser] = await factories
				.users(database)
				.create(2);
			const [taskToDelete1, taskToDelete2] = await factories
				.tasks(database)
				.create([{ ownerId: userToDelete.id }, { ownerId: userToDelete.id }]);
			const otherTask = await factories
				.tasks(database)
				.create({ ownerId: otherUser.id });
			const [authEventToDelete1, authEventToDelete2] = await factories
				.userAuthenticatedEvents(database)
				.create([{ userId: userToDelete.id }, { userId: userToDelete.id }]);
			const otherAuthEvent = await factories
				.userAuthenticatedEvents(database)
				.create({ userId: otherUser.id });

			await deleteUser(userToDelete.id);

			// 検証: ユーザーが削除されているか
			const deletedUserResult = await database
				.select()
				.from(tables.users)
				.where(eq(tables.users.id, userToDelete.id));
			expect(deletedUserResult).toHaveLength(0);

			// 検証: 関連タスクが削除されているか
			const deletedTasksResult = await database
				.select()
				.from(tables.tasks)
				.where(eq(tables.tasks.ownerId, userToDelete.id));
			expect(deletedTasksResult).toHaveLength(0);

			// 検証: 関連認証イベントが削除されているか
			const deletedAuthEventsResult = await database
				.select()
				.from(tables.userAuthenticatedEvents)
				.where(eq(tables.userAuthenticatedEvents.userId, userToDelete.id));
			expect(deletedAuthEventsResult).toHaveLength(0);

			// 検証: 他のユーザーとそのデータが残っているか
			const otherUserResult = await database
				.select()
				.from(tables.users)
				.where(eq(tables.users.id, otherUser.id));
			expect(otherUserResult).toHaveLength(1);
			expect(otherUserResult[0]).toEqual(otherUser);

			const otherTaskResult = await database
				.select()
				.from(tables.tasks)
				.where(eq(tables.tasks.ownerId, otherUser.id));
			expect(otherTaskResult).toHaveLength(1);
			expect(otherTaskResult[0]).toEqual(
				expect.objectContaining({ id: otherTask.id }),
			); // 他のプロパティも検証可能

			const otherAuthEventResult = await database
				.select()
				.from(tables.userAuthenticatedEvents)
				.where(eq(tables.userAuthenticatedEvents.userId, otherUser.id));
			expect(otherAuthEventResult).toHaveLength(1);
			expect(otherAuthEventResult[0]).toEqual(
				expect.objectContaining({ id: otherAuthEvent.id }),
			); // 他のプロパティも検証可能
		});
	});

	test("存在しないユーザーIDを指定した場合、例外が投げられる", async () => {
		await withTestDb(async () => {
			const nonExistentUserId = "non-existent-user-id";

			await expect(deleteUser(nonExistentUserId)).rejects.toThrowError(
				"存在しないユーザーのIDが指定されました",
			);
		});
	});
});
