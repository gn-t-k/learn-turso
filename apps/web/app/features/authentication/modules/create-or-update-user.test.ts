import { factories, resetTables, tables } from "@packages/database";
import { withTestDb } from "app/helpers/with-test-db";
import { beforeEach, describe, expect, test } from "vitest";
import { createOrUpdateUser } from "./create-or-update-user.server";

describe("createOrUpdateUser", async () => {
	beforeEach(async () => {
		await resetTables();
	});

	test("同じemailのユーザーが存在しない場合、ユーザーが作成される", () => {
		withTestDb(async (database) => {
			const email = "test@example.com";
			const name = "Test User";
			const imageUrl = "https://example.com/image.jpg";
			const before = await database.select().from(tables.users);
			expect(before).toEqual([]);

			await factories.users(database).create({ email, name, imageUrl });

			const after = await database
				.select({
					email: tables.users.email,
					name: tables.users.name,
					imageUrl: tables.users.imageUrl,
				})
				.from(tables.users);
			expect(after).toEqual([{ email, name, imageUrl }]);
		});
	});

	test("同じemailのユーザーが存在する場合、ユーザーが更新される", () => {
		withTestDb(async (database) => {
			const email = "test@example.com";
			const name = "Test User";
			const imageUrl = "https://example.com/image.jpg";

			await createOrUpdateUser({ email, name, imageUrl });
			const before = await database
				.select({
					email: tables.users.email,
					name: tables.users.name,
					imageUrl: tables.users.imageUrl,
				})
				.from(tables.users);
			expect(before).toEqual([{ email, name, imageUrl }]);

			const updatedName = "Updated User";
			await createOrUpdateUser({ email, name: updatedName, imageUrl });
			const after = await database
				.select({
					email: tables.users.email,
					name: tables.users.name,
					imageUrl: tables.users.imageUrl,
				})
				.from(tables.users);
			expect(after).toEqual([{ email, name: updatedName, imageUrl }]);
		});
	});
});
