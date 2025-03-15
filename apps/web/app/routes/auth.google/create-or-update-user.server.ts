import {
	type InferInsertModel,
	type InferSelectModel,
	getDatabase,
} from "@packages/database";
import { users } from "@packages/database/src/tables/users";

type CreateOrUpdateUser = (
	props: InferInsertModel<typeof users>,
) => Promise<InferSelectModel<typeof users> | undefined>;
export const createOrUpdateUser: CreateOrUpdateUser = async (props) => {
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
