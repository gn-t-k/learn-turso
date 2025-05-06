import { defineFactory } from "@praha/drizzle-factory";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users, usersFactory } from "./users";

export const userAuthenticatedEvents = sqliteTable(
	"user_authenticated_events",
	{
		id: text("id").primaryKey(),
		userId: text("user_id")
			.notNull()
			.references(() => users.id),
		authenticatedBy: text("authenticated_by").notNull(),
		authenticatedAt: integer({ mode: "timestamp_ms" }).notNull(),
	},
);

export const userAuthenticatedEventsFactory = defineFactory({
	schema: { users, userAuthenticatedEvents },
	table: "userAuthenticatedEvents",
	resolver: ({ sequence, use }) => ({
		id: sequence.toString(),
		userId: () =>
			use(usersFactory)
				.create()
				.then((user) => user.id),
		authenticatedBy: "google",
		authenticatedAt: new Date(),
	}),
});
