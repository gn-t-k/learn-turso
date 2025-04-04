import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

const meta = {
	title: "Button",
	component: Button,
} satisfies Meta<typeof Button>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "Button",
	},
	argTypes: {
		variant: {
			control: "select",
			options: ["default", "destructive", "outline", "secondary", "ghost"],
			description: "The visual style of the button",
		},
		size: {
			control: "select",
			options: ["default", "sm", "lg", "icon"],
			description: "The size of the button",
		},
	},
};
