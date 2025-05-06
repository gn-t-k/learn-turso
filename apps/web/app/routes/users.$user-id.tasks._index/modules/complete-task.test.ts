import { eq, factories, resetTables, tables } from "@packages/database";
import { withTestDb } from "app/helpers/with-test-db";
import { beforeEach, describe, expect, test } from "vitest";
import { completeTask } from "./complete-task.server";

describe("completeTask", () => {
	beforeEach(async () => {
		await resetTables();
	});

	describe("存在するタスクIDを指定した場合", () => {
		let createdTask: typeof tables.tasks.$inferInsert;
		let updatedTasks: (typeof tables.tasks.$inferInsert)[];

		beforeEach(async () => {
			await withTestDb(async (database) => {
				createdTask = await factories.tasks(database).create();

				await completeTask(createdTask.id);

				updatedTasks = await database
					.select()
					.from(tables.tasks)
					.where(eq(tables.tasks.id, createdTask.id));
			});
		});

		test("タスクのcompletedがtrueに更新される", () => {
			expect(updatedTasks).toEqual([
				expect.objectContaining({
					completed: true,
				}),
			]);
		});

		test("タスクのupdatedAtが更新される", () => {
			expect(updatedTasks[0]?.updatedAt.getTime()).toBeGreaterThan(
				createdTask.updatedAt.getTime(),
			);
		});
	});

	describe("存在しないタスクIDを指定した場合", () => {
		const nonExistentTaskId = "non-existent-task-id";

		test("TaskNotFoundErrorが投げられる", async () => {
			await withTestDb(async () => {
				await expect(completeTask(nonExistentTaskId)).rejects.toThrowError(
					"存在しないタスクのIDが指定されました",
				);
			});
		});

		test("どのタスクも更新されない", async () => {
			await withTestDb(async (database) => {
				const originalTask = await factories
					.tasks(database)
					.create({ completed: false });

				try {
					await completeTask(nonExistentTaskId);
				} catch {
					// エラーは無視
				}

				const taskAfterAttempt = await database
					.select()
					.from(tables.tasks)
					.where(eq(tables.tasks.id, originalTask.id));

				expect(taskAfterAttempt).toEqual([originalTask]);
			});
		});
	});
});
