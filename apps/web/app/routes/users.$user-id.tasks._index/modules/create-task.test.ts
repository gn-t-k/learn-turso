import { eq, factories, resetTables, tables } from "@packages/database";
import { withTestDb } from "app/helpers/with-test-db";
import { beforeEach, describe, expect, test } from "vitest";
import { createTask } from "./create-task.server";

describe("createTask", () => {
	beforeEach(async () => {
		await resetTables();
	});

	describe("指定したユーザーIDのユーザーが存在する場合", () => {
		test("タスクが作成される", async () => {
			await withTestDb(async (database) => {
				const user = await factories.users(database).create();
				const taskTitle = "New Task Title";

				await createTask({ userId: user.id, title: taskTitle });

				const createdTasks = await database
					.select()
					.from(tables.tasks)
					.where(eq(tables.tasks.ownerId, user.id));

				expect(createdTasks).toEqual([
					expect.objectContaining({
						title: taskTitle,
						completed: false,
						ownerId: user.id,
					}),
				]);
			});
		});
	});

	describe("存在しないユーザーIDを指定した場合", () => {
		test("UserNotFoundErrorが投げられる", async () => {
			await withTestDb(async () => {
				const nonExistentUserId = "non-existent-user-id";
				const taskTitle = "Task for non-existent user";

				await expect(
					createTask({ userId: nonExistentUserId, title: taskTitle }),
				).rejects.toThrowError("存在しないユーザーのIDが指定されました");
			});
		});

		test("タスクが作成されない", async () => {
			await withTestDb(async (database) => {
				const nonExistentUserId = "non-existent-user-id";
				const taskTitle = "Task for non-existent user";

				try {
					await createTask({ userId: nonExistentUserId, title: taskTitle });
				} catch {
					// エラーは無視
				}

				const tasks = await database.select().from(tables.tasks);
				expect(tasks).toHaveLength(0);
			});
		});
	});
});
