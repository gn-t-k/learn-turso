// biome-ignore lint/correctness/noNodejsModules: <explanation>
import fs from "node:fs";
// biome-ignore lint/correctness/noNodejsModules: <explanation>
import path from "node:path";
import { createClient } from "@libsql/client";
import { temporaryDatabaseConfig } from "./temporary-database-config";

type RunMigrations = () => Promise<void>;
export const runMigrations: RunMigrations = async () => {
	const migrationsDir = path.join(__dirname, "../../migrations");

	if (!fs.existsSync(migrationsDir)) {
		throw new Error(`Migrations directory does not exist: ${migrationsDir}`);
	}

	const migrationFiles = fs
		.readdirSync(migrationsDir)
		.filter((file) => file.endsWith(".sql"))
		.sort();

	const database = createClient(temporaryDatabaseConfig);
	for (const file of migrationFiles) {
		const filePath = path.join(migrationsDir, file);
		const sql = fs.readFileSync(filePath, "utf-8");

		const statements = sql
			.split(";")
			.map((statement) => statement.trim())
			.filter((statement) => statement.length > 0);

		await database.migrate(statements);
	}
};
