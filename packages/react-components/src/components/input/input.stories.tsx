import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./input";

export default {
	component: Input,
	argTypes: {
		disabled: { control: "boolean" },
		autoFocus: { control: "boolean" },
		placeholder: { control: "text" },
	},
} satisfies Meta<typeof Input>;

type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const WithPlaceholder: Story = {
	args: {
		placeholder: "Enter text here",
	},
};

export const WithDefaultValue: Story = {
	args: {
		defaultValue: "Default value",
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
		defaultValue: "Default value",
	},
};

export const AutoFocus: Story = {
	args: {
		autoFocus: true,
		placeholder: "Auto focused input",
	},
};
