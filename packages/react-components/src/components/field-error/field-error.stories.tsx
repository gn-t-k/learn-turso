import type { Meta, StoryObj } from "@storybook/react";
import { TextField } from "../textfield/textfield";
import { FieldError } from "./field-error";

export default {
	component: FieldError,
} satisfies Meta<typeof FieldError>;

type Story = StoryObj<typeof FieldError>;

export const Default: Story = {
	render: () => (
		<TextField isInvalid>
			<FieldError>Field error</FieldError>
		</TextField>
	),
};
