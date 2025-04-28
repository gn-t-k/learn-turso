import { database, eq } from "@packages/database";
import { tables } from "@packages/database";

type FindUser = (id: string) => Promise<User | undefined>;
type User = {
	id: string;
	name: string;
};
export const findUser: FindUser = async (id) => {
	const [user] = await database
		.select({ id: tables.users.id, name: tables.users.name })
		.from(tables.users)
		.where(eq(tables.users.id, id));

	return user;
};
