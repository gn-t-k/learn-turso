import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
	id: text("id").primaryKey(),
	email: text("email").notNull(),
	name: text("name").notNull(),
	imageUrl: text("image_url").notNull(),
});
