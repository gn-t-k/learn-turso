import { type FC, use } from "react";

type TaskListProps = {
	tasksPromise: Promise<Task[]>;
};
type Task = {
	id: string;
	title: string;
	completed: boolean;
};
export const TaskList: FC<TaskListProps> = ({ tasksPromise }) => {
	const tasks = use(tasksPromise);

	return (
		<ul>
			{tasks.map((task) => (
				<li key={task.id}>
					<input
						type="checkbox"
						defaultChecked={task.completed}
						onChange={(event) => console.log(event.currentTarget.checked)}
					/>
					{task.title}
				</li>
			))}
		</ul>
	);
};

export const TaskListSkeleton: FC = () => (
	<ul>
		<li>
			<input type="checkbox" disabled />
			Loading...
		</li>
		<li>
			<input type="checkbox" disabled />
			Loading...
		</li>
		<li>
			<input type="checkbox" disabled />
			Loading...
		</li>
	</ul>
);
