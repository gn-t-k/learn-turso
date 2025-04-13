import { dropTables, runMigrations } from "@packages/database";
import type { TestProject } from "vitest/node";

export const setup = async (_project: TestProject) => {
	await dropTables();
	await runMigrations();
};
