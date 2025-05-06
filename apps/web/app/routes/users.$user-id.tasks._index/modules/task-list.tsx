import { type ChangeEventHandler, type FC, use, useCallback } from "react";

type TaskListProps = {
	tasksPromise: Promise<Task[]>;
	completeTask: (taskId: string) => Promise<void>;
	busy: boolean;
};
type Task = {
	id: string;
	title: string;
	completed: boolean;
};
export const TaskList: FC<TaskListProps> = ({
	tasksPromise,
	completeTask,
	busy,
}) => {
	const tasks = use(tasksPromise);

	const onChange = useCallback<
		(taskId: string) => ChangeEventHandler<HTMLInputElement>
	>(
		(taskId) => (event) => {
			if (event.currentTarget.checked === true) {
				completeTask(taskId);
			}
		},
		[completeTask],
	);

	return (
		<ul>
			{tasks.map((task) => (
				<li key={task.id}>
					<input
						type="checkbox"
						defaultChecked={task.completed}
						onChange={onChange(task.id)}
						disabled={busy}
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
