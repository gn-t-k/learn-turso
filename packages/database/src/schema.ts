import type { AnyTable, Relations } from "drizzle-orm";
import { tasks } from "./tables/tasks";
import { userAuthenticatedEvents } from "./tables/user-authenticated-events";
import { users } from "./tables/users";

export const schema = {
	users,
	tasks,
	userAuthenticatedEvents,
} satisfies Record<string, AnyTable<NonNullable<unknown>> | Relations>;
