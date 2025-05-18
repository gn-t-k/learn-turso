import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

export default {
	component: Avatar,
	subcomponents: { AvatarImage, AvatarFallback },
} satisfies Meta<typeof Avatar>;

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
	render: () => (
		<Avatar className="size-16">
			<AvatarImage
				className="object-cover"
				src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
				alt="User Avatar"
			/>
			<AvatarFallback>AB</AvatarFallback>
		</Avatar>
	),
};

export const WithFallback: Story = {
	render: () => (
		<Avatar className="size-16">
			<AvatarImage src="https://invalid-url" alt="User Avatar" />
			<AvatarFallback>CD</AvatarFallback>
		</Avatar>
	),
};
