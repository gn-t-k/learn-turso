import type { Meta, StoryObj } from "@storybook/react";
import type { VariantProps } from "class-variance-authority";
import { Button, type buttonVariants } from "./button";

export default {
	component: Button,
} satisfies Meta<typeof Button>;

type Story = StoryObj<typeof Button>;
type StyleVariants = VariantProps<typeof buttonVariants>;

export const Default = {
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
} satisfies Story;
