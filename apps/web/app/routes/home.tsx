import { getDatabase } from "@packages/database";
import { tasks } from "@packages/database/src/tables/tasks";
import type { FC } from "react";
import { Welcome } from "../welcome/welcome";
import type { Route } from "./+types/home";

export const meta = ({}: Route.MetaArgs) => {
	return [
		{ title: "New React Router App" },
		{ name: "description", content: "Welcome to React Router!" },
	];
};

export const loader = async ({ context }: Route.LoaderArgs) => {
	const database = getDatabase();
	const result = await database.select({ id: tasks.id }).from(tasks);

	return {
		tasks: result,
	};
};

const Home: FC<Route.ComponentProps> = ({ loaderData }) => {
	const { tasks } = loaderData;
	console.log({ tasks });
	return <Welcome message={tasks.toString()} />;
};
export default Home;
