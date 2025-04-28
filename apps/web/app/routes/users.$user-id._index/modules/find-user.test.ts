import { factories, resetTables } from "@packages/database";
import { withTestDb } from "app/helpers/with-test-db";
import { beforeEach, describe, expect, test } from "vitest";
import { findUser } from "./find-user.server";

describe("findUser", () => {
	beforeEach(async () => {
		await resetTables();
	});

	test("存在するユーザーIDを指定した場合、ユーザー情報が返される", async () => {
		await withTestDb(async (database) => {
			const email = "test@example.com";
			const name = "Test User";
			const imageUrl = "https://example.com/image.jpg";
			const createdUser = await factories
				.users(database)
				.create({ email, name, imageUrl });

			const foundUser = await findUser(createdUser.id);

			expect(foundUser).toEqual({
				id: createdUser.id,
				name: name,
			});
		});
	});

	test("存在しないユーザーIDを指定した場合、undefinedが返される", async () => {
		await withTestDb(async () => {
			const nonExistentId = "non-existent-id";
			const foundUser = await findUser(nonExistentId);

			expect(foundUser).toBeUndefined();
		});
	});
});
