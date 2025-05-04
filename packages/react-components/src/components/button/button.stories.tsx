import type { Meta, StoryObj } from "@storybook/react";
import type { VariantProps } from "class-variance-authority";
import { Button, type buttonVariants } from "./button";

const meta = {
	title: "Button",
	component: Button,
} satisfies Meta<typeof Button>;
export default meta;

type Story = StoryObj<typeof meta>;
type StyleVariants = VariantProps<typeof buttonVariants>;

export const Default: Story = {
	args: {
		children: "Button",
	},
	argTypes: {
		variant: {
			control: "select",
			options: [
				"primary",
				"destructive",
				"outline",
				"secondary",
				"ghost",
			] satisfies StyleVariants["variant"][],
		},
		size: {
			control: "select",
			options: ["sm", "md", "lg", "icon"] satisfies StyleVariants["size"][],
		},
	},
};
