import { databaseProvider, temporaryDatabaseConfig } from "@packages/database";

type WithTestDb = <T>(callback: () => T) => T;
export const withTestDb: WithTestDb = (callback) => {
	return databaseProvider(temporaryDatabaseConfig, callback);
};
