import type { Meta, StoryObj } from "@storybook/react";
import { TextLink } from "./text-link";

export default {
	component: TextLink,
	argTypes: {
		href: { control: "text" },
		children: { control: "text" },
		isDisabled: { control: "boolean" },
		target: { control: "text" },
		rel: { control: "text" },
		asChild: { table: { disable: true } },
	},
} satisfies Meta<typeof TextLink>;

type Story = StoryObj<typeof TextLink>;

export const Default: Story = {
	args: {
		href: "#",
		children: "Default Link",
	},
};

export const External: Story = {
	args: {
		href: "https://example.com",
		children: "External Link",
		target: "_blank",
		rel: "noopener noreferrer",
	},
};

export const Disabled: Story = {
	args: {
		href: "#",
		isDisabled: true,
		children: "Disabled Link",
	},
};
