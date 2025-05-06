import { defineFactory } from "@praha/drizzle-factory";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users, usersFactory } from "./users";

export const tasks = sqliteTable("tasks", {
	id: text("id").primaryKey(),
	title: text("title").notNull(),
	completed: integer({ mode: "boolean" }).notNull(),
	ownerId: text("owner_id")
		.notNull()
		.references(() => users.id),
	createdAt: integer({ mode: "timestamp_ms" }).notNull(),
	updatedAt: integer({ mode: "timestamp_ms" }).notNull(),
});

export const tasksFactory = defineFactory({
	table: "tasks",
	schema: { users, tasks },
	resolver: ({ sequence, use }) => {
		const now = new Date();

		return {
			id: sequence.toString(),
			title: `Task ${sequence}`,
			completed: false,
			ownerId: () =>
				use(usersFactory)
					.create()
					.then((user) => user.id),
			createdAt: now,
			updatedAt: now,
		};
	},
});
