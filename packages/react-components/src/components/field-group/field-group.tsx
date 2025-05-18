import type { FC } from "react";
import {
	Group as AriaGroup,
	type GroupProps as AriaGroupProps,
	composeRenderProps,
} from "react-aria-components";
import { cn } from "../../utilities/cn";

export const FieldGroup: FC<AriaGroupProps> = ({ className, ...props }) => (
	<AriaGroup
		className={composeRenderProps(className, (className) =>
			cn(
				"relative flex h-10 w-full items-center overflow-hidden rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
				/* Focus Within */
				"data-[focus-within]:outline-none data-[focus-within]:ring-2 data-[focus-within]:ring-ring data-[focus-within]:ring-offset-2",
				/* Disabled */
				"data-[disabled]:opacity-50",

				className,
			),
		)}
		{...props}
	/>
);
