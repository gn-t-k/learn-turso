import { factories, resetTables } from "@packages/database";
import { withTestDb } from "app/helpers/with-test-db";
import { beforeEach, describe, expect, test } from "vitest";
import { getTasks } from "./get-tasks.server";

describe("getTasks", () => {
	beforeEach(async () => {
		await resetTables();
	});

	test("指定したユーザーIDのタスクが存在する場合、タスクの配列が返される", async () => {
		await withTestDb(async (database) => {
			const [user1, user2] = await factories.users(database).create(2);
			const [user1Task1, user1Task2, user2Task1] = await factories
				.tasks(database)
				.create([
					{ ownerId: user1.id },
					{ ownerId: user1.id },
					{ ownerId: user2.id },
				]);

			const tasks = await getTasks(user1.id);

			expect(tasks).toHaveLength(2);
			expect(tasks).toEqual(
				expect.arrayContaining([
					{
						id: user1Task1.id,
						title: user1Task1.title,
						completed: user1Task1.completed,
					},
					{
						id: user1Task2.id,
						title: user1Task2.title,
						completed: user1Task2.completed,
					},
				]),
			);
			expect(tasks).toEqual(
				expect.not.arrayContaining([
					{
						id: user2Task1.id,
						title: user2Task1.title,
						completed: user2Task1.completed,
					},
				]),
			);
		});
	});

	test("指定したユーザーIDのタスクが存在しない場合、空の配列が返される", async () => {
		await withTestDb(async (database) => {
			const user = await factories.users(database).create();

			const tasks = await getTasks(user.id);

			expect(tasks).toEqual([]);
		});
	});

	test("存在しないユーザーIDを指定した場合、例外が投げられる", async () => {
		await withTestDb(async () => {
			const nonExistentUserId = "non-existent-user-id";

			await expect(getTasks(nonExistentUserId)).rejects.toThrowError();
		});
	});
});
