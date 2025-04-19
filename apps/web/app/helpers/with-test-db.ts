import { databaseProvider, temporaryDatabaseConfig } from "@packages/database";

type WithTestDb = <T>(callback: () => Promise<T>) => Promise<T>;
export const withTestDb: WithTestDb = async (callback) => {
	return await databaseProvider(temporaryDatabaseConfig, callback);
};
