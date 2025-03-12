import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "./users";

export const userAuthenticatedEvents = sqliteTable(
	"user_authenticated_events",
	{
		id: text("id").primaryKey(),
		userId: text("user_id")
			.notNull()
			.references(() => users.id),
		authenticatedBy: text("authenticated_by").notNull(),
		authenticatedAt: integer({ mode: "timestamp" }).notNull(),
	},
);
