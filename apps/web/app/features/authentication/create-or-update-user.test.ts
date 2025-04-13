import { deleteTables, getDatabase } from "@packages/database";
import { users } from "@packages/database/src/tables/users";
import { withTestDb } from "app/helpers/with-test-db";
import { beforeEach, describe, expect, test } from "vitest";
import { createOrUpdateUser } from "./create-or-update-user.server";

describe("createOrUpdateUser", async () => {
	beforeEach(async () => {
		await deleteTables();
	});

	test("同じemailのユーザーが存在しない場合、ユーザーが作成される", () => {
		const email = "test@example.com";
		const name = "Test User";
		const imageUrl = "https://example.com/image.jpg";

		withTestDb(async () => {
			await createOrUpdateUser({ email, name, imageUrl });

			const database = getDatabase();
			const result = await database
				.select({
					email: users.email,
					name: users.name,
					imageUrl: users.imageUrl,
				})
				.from(users);

			expect(result).toEqual([{ email, name, imageUrl }]);
		});
	});

	test("同じemailのユーザーが存在する場合、ユーザーが更新される", () => {
		const email = "test@example.com";
		const name = "Test User";
		const imageUrl = "https://example.com/image.jpg";

		const updatedName = "Updated User";

		withTestDb(async () => {
			await createOrUpdateUser({ email, name, imageUrl });
			await createOrUpdateUser({ email, name: updatedName, imageUrl });

			const database = getDatabase();
			const result = await database
				.select({
					email: users.email,
					name: users.name,
					imageUrl: users.imageUrl,
				})
				.from(users);

			expect(result).toEqual([{ email, name: updatedName, imageUrl }]);
		});
	});
});
