import { eq, getDatabase } from "@packages/database";
import { users as usersTable } from "@packages/database/src/tables/users";

type FindUser = (id: string) => Promise<User | undefined>;
type User = {
	id: string;
	name: string;
};
export const findUser: FindUser = async (id) => {
	const database = getDatabase();
	const [user] = await database
		.select({ id: usersTable.id, name: usersTable.name })
		.from(usersTable)
		.where(eq(usersTable.id, id));

	return user;
};
