import { resetDatabase } from "@packages/database";
import type { TestProject } from "vitest/node";

export const setup = async (_project: TestProject) => {
	await resetDatabase();
};
