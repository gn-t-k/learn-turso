import { defineFactory } from "@praha/drizzle-factory";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
	id: text("id").primaryKey(),
	email: text("email").notNull(),
	name: text("name").notNull(),
	imageUrl: text("image_url").notNull(),
});

export const usersFactory = defineFactory({
	schema: { users },
	table: "users",
	resolver: ({ sequence }) => ({
		id: sequence.toString(),
		email: `${sequence}@example.com`,
		name: `User ${sequence}`,
		imageUrl: `https://example.com/${sequence}.jpg`,
	}),
});
