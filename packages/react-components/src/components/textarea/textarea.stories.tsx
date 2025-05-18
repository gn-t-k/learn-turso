import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./textarea";

export default {
	component: Textarea,
	argTypes: {
		disabled: { control: "boolean" },
		autoFocus: { control: "boolean" },
		placeholder: { control: "text" },
		defaultValue: { control: "text" },
	},
} satisfies Meta<typeof Textarea>;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {};

export const WithPlaceholder: Story = {
	args: {
		placeholder: "Enter your message...",
	},
};

export const WithDefaultValue: Story = {
	args: {
		defaultValue: "This is a default value.\nFeel free to edit it.",
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
		defaultValue: "Disabled textarea",
	},
};

export const AutoFocus: Story = {
	args: {
		autoFocus: true,
		placeholder: "Auto-focused textarea",
	},
};
