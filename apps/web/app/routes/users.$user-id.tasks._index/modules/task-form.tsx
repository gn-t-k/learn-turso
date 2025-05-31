import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { getValibotConstraint, parseWithValibot } from "@conform-to/valibot";
import {
	Button,
	FieldErrorMessages,
	Input,
	Label,
	TextField,
} from "@packages/react-components";
import type { FC } from "react";
import { Form, useActionData } from "react-router";
import { maxLength, minLength, object, pipe, string } from "valibot";
import type { action } from "../route";

export const taskFormSchema = object({
	title: pipe(
		string("Title must be at least 1 character long."),
		minLength(1, "Title must be at least 1 character long."),
		maxLength(100, "Title must be at most 100 characters long."),
	),
});

type Props = {
	actionType: "create-task" | "update-task";
};
export const TaskForm: FC<Props> = ({ actionType }) => {
	const actionData = useActionData<typeof action>();
	const lastResult = actionData?.submissionResult;
	const [form, fields] = useForm({
		lastResult,
		constraint: getValibotConstraint(taskFormSchema),
		shouldValidate: "onBlur",
		shouldRevalidate: "onInput",
		onValidate: ({ formData }) =>
			parseWithValibot(formData, { schema: taskFormSchema }),
	});

	// 101文字以上入力できないエラーメッセージを表示するため
	const { maxLength: _, ...inputProps } = getInputProps(fields.title, {
		type: "text",
	});

	return (
		<Form method="post" {...getFormProps(form)}>
			<TextField
				className="grid grid-cols-[auto_1fr_auto] items-center gap-2"
				isInvalid={(fields.title.errors ?? [])?.length > 0}
			>
				<Label htmlFor={fields.title.id}>Todo: </Label>
				<Input {...inputProps} />
				<Button type="submit" name="actionType" value={actionType}>
					Submit
				</Button>
				<FieldErrorMessages
					errors={fields.title.errors}
					className="col-span-3"
				/>
			</TextField>
		</Form>
	);
};
