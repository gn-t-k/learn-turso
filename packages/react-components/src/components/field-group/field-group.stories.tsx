import type { Meta, StoryObj } from "@storybook/react";
import { PlusIcon } from "lucide-react";
import { Button } from "../button/button";
import { Input } from "../input/input";
import { FieldGroup } from "./field-group";

export default {
	component: FieldGroup,
} satisfies Meta<typeof FieldGroup>;

type Story = StoryObj<typeof FieldGroup>;

export const ButtonInInputField = {
	render: () => (
		<FieldGroup className="p-0">
			<Input className="rounded-none border-0 data-[focused]:ring-0" />
			<Button variant="ghost" size="icon" aria-label="Add email">
				<PlusIcon className="size-4" />
			</Button>
		</FieldGroup>
	),
} satisfies Story;
