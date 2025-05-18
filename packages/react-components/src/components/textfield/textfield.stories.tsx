import type { Meta, StoryObj } from "@storybook/react";
import { FieldDescription } from "../field-description/field-description";
import { FieldError } from "../field-error/field-error";
import { Input } from "../input/input";
import { Label } from "../label/label";
import { TextField } from "./textfield";

export default {
	component: TextField,
} satisfies Meta<typeof TextField>;

type Story = StoryObj<typeof TextField>;

export const Default: Story = {
	argTypes: {
		isInvalid: { control: "boolean" },
		isDisabled: { control: "boolean" },
		isReadOnly: { control: "boolean" },
		isRequired: { control: "boolean" },
	},
	render: (args) => (
		<TextField {...args} className="grid gap-2">
			<Label>Label</Label>
			<Input />
			<FieldDescription
				className="text-muted-foreground text-sm"
				slot="description"
			>
				Description
			</FieldDescription>
			<FieldError>Error message</FieldError>
		</TextField>
	),
};
