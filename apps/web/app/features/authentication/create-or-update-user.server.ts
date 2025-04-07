import { and, desc, eq, getDatabase } from "@packages/database";
import type { InferInsertModel, InferSelectModel } from "@packages/database";
import { userAuthenticatedEvents } from "@packages/database/src/tables/user-authenticated-events";
import { users } from "@packages/database/src/tables/users";
import { ulid } from "ulid";

type CreateOrUpdateGoogleAuthenticatedUser = (props: {
	email: string;
	name: string;
	imageUrl: string;
}) => Promise<User>;
type User = { id: string; email: string; name: string; imageUrl: string };
export const createOrUpdateUser: CreateOrUpdateGoogleAuthenticatedUser =
	async ({ name, email, imageUrl }) => {
		const lastAuthenticatedEvent = await findLastAuthenticatedEvent({
			email,
			authenticatedBy: "google",
		});
		const isFirstTime = lastAuthenticatedEvent === undefined;
		const userId = isFirstTime ? ulid() : lastAuthenticatedEvent.userId;

		const [user, userAuthenticatedEvent] = await Promise.all([
			upsertUser({ id: userId, email, name, imageUrl }),
			insertUserAuthenticatedEvent({
				id: ulid(),
				userId,
				authenticatedBy: "google",
				authenticatedAt: new Date(),
			}),
		]);

		if (user === undefined) {
			throw new Error("usersのupsertクエリが失敗しました");
		}
		if (userAuthenticatedEvent === undefined) {
			throw new Error("user_authenticated_eventsのinsertクエリが失敗しました");
		}

		return user;
	};

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

type UpsertUser = (
	props: InferInsertModel<typeof users>,
) => Promise<InferSelectModel<typeof users> | undefined>;
const upsertUser: UpsertUser = async (props) => {
	const database = getDatabase();
	const [user] = await database
		.insert(users)
		.values(props)
		.onConflictDoUpdate({
			target: users.id,
			set: { name: props.name, imageUrl: props.imageUrl },
		})
		.returning();

	return user;
};

type InsertUserAuthenticatedEvent = (
	props: InferInsertModel<typeof userAuthenticatedEvents>,
) => Promise<InferSelectModel<typeof userAuthenticatedEvents> | undefined>;
const insertUserAuthenticatedEvent: InsertUserAuthenticatedEvent = async (
	props,
) => {
	const database = getDatabase();
	const [event] = await database
		.insert(userAuthenticatedEvents)
		.values(props)
		.returning();

	return event;
};
