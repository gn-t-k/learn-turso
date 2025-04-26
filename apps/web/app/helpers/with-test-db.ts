import {
	databaseProvider,
	getDatabase,
	temporaryDatabaseConfig,
} from "@packages/database";

type WithTestDb = <T>(
	callback: (database: ReturnType<typeof getDatabase>) => Promise<T>,
) => Promise<T>;
export const withTestDb: WithTestDb = async (callback) => {
	return await databaseProvider(temporaryDatabaseConfig, () => {
		const database = getDatabase();
		return callback(database);
	});
};
