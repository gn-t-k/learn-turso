import {
	type InferInsertModel,
	type InferSelectModel,
	getDatabase,
} from "@packages/database";
import { userAuthenticatedEvents } from "@packages/database/src/tables/user-authenticated-events";

type CreateUserAuthenticatedEvent = (
	props: InferInsertModel<typeof userAuthenticatedEvents>,
) => Promise<InferSelectModel<typeof userAuthenticatedEvents> | undefined>;
export const createUserAuthenticatedEvent: CreateUserAuthenticatedEvent =
	async (props) => {
		const database = getDatabase();
		const [event] = await database
			.insert(userAuthenticatedEvents)
			.values(props)
			.returning();

		return event;
	};
