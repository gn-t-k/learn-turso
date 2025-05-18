import type { Meta, StoryObj } from "@storybook/react";
import { TextField } from "../textfield/textfield";
import { Label } from "./label";

export default {
	component: Label,
	argTypes: {
		className: { control: "text" },
		children: { control: "text" },
	},
} satisfies Meta<typeof Label>;

type Story = StoryObj<typeof Label>;

export const Default: Story = {
	args: {
		children: "Label Text",
	},
};

export const Disabled: Story = {
	render: (args) => (
		<TextField isDisabled>
			<Label {...args}>Disabled Label</Label>
		</TextField>
	),
};

export const Invalid: Story = {
	render: (args) => (
		<TextField isInvalid>
			<Label {...args}>Invalid Label</Label>
		</TextField>
	),
};
