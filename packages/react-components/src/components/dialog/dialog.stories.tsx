import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../button/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogOverlay,
	DialogTitle,
	DialogTrigger,
} from "./dialog";

export default {
	component: Dialog,
} satisfies Meta<typeof Dialog>;

type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
	render: () => (
		<DialogTrigger>
			<Button variant="outline">Open Dialog</Button>
			<DialogOverlay>
				<DialogContent>
					{({ close }) => (
						<div className="grid gap-4">
							<DialogHeader>
								<DialogTitle>Dialog Title</DialogTitle>
								<DialogDescription>
									This is a description of the dialog.
								</DialogDescription>
							</DialogHeader>
							<DialogFooter>
								<Button variant="outline" onClick={close}>
									Cancel
								</Button>
								<Button variant="primary" onClick={close}>
									Confirm
								</Button>
							</DialogFooter>
						</div>
					)}
				</DialogContent>
			</DialogOverlay>
		</DialogTrigger>
	),
};
