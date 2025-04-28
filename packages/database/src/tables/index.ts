import type { AnyTable, Relations } from "drizzle-orm";
import { tasks, tasksFactory } from "./tasks";
import {
	userAuthenticatedEvents,
	userAuthenticatedEventsFactory,
} from "./user-authenticated-events";
import { users, usersFactory } from "./users";

export const tables = {
	users,
	tasks,
	userAuthenticatedEvents,
} satisfies Record<string, AnyTable<NonNullable<unknown>> | Relations>;

export const factories = {
	users: usersFactory,
	tasks: tasksFactory,
	userAuthenticatedEvents: userAuthenticatedEventsFactory,
};
