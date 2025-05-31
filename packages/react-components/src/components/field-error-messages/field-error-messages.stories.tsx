import type { Meta, StoryObj } from "@storybook/react";
import { TextField } from "../textfield/textfield";
import { FieldErrorMessages } from "./field-error-messages";

export default {
	component: FieldErrorMessages,
} satisfies Meta<typeof FieldErrorMessages>;

type Story = StoryObj<typeof FieldErrorMessages>;

const isInvalid = (errors: string[]) => errors.length > 0;

export const Default: Story = {
	render: () => {
		const errors = ["This field is required."];
		return (
			<TextField isInvalid={isInvalid(errors)}>
				<FieldErrorMessages errors={errors} />
			</TextField>
		);
	},
};

export const MultipleErrors: Story = {
	render: () => {
		const errors = [
			"This field is required.",
			"Must be at least 8 characters.",
			"Must contain a number.",
		];
		return (
			<TextField isInvalid={isInvalid(errors)}>
				<FieldErrorMessages errors={errors} />
			</TextField>
		);
	},
};

export const NoErrors: Story = {
	render: () => {
		const errors = [] satisfies string[];
		return (
			<TextField isInvalid={isInvalid(errors)}>
				<FieldErrorMessages errors={errors} />
			</TextField>
		);
	},
};
