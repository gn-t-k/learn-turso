import { and, desc, eq, getDatabase } from "@packages/database";
import { userAuthenticatedEvents } from "@packages/database/src/tables/user-authenticated-events";
import { users } from "@packages/database/src/tables/users";

type FindLastAuthenticatedEvent = (props: {
	email: string;
	authenticatedBy: string;
}) => Promise<{ userId: string } | undefined>;
export const findLastAuthenticatedEvent: FindLastAuthenticatedEvent = async ({
	email,
	authenticatedBy,
}) => {
	const database = getDatabase();
	const [lastAuthenticatedEvent] = await database
		.select({ userId: userAuthenticatedEvents.userId })
		.from(userAuthenticatedEvents)
		.innerJoin(users, eq(userAuthenticatedEvents.userId, users.id))
		.where(
			and(
				eq(users.email, email),
				eq(userAuthenticatedEvents.authenticatedBy, authenticatedBy),
			),
		)
		.orderBy(desc(userAuthenticatedEvents.authenticatedAt))
		.limit(1);

	return lastAuthenticatedEvent
		? { userId: lastAuthenticatedEvent.userId }
		: undefined;
};
