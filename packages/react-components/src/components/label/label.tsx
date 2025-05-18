import type { FC } from "react";
import {
	Label as AriaLabel,
	type LabelProps as AriaLabelProps,
} from "react-aria-components";
import { cn } from "../../utilities/cn";

export const Label: FC<AriaLabelProps> = ({ className, ...props }) => (
	<AriaLabel
		className={cn(
			"font-medium text-sm leading-none",
			/* Disabled */
			"data-[disabled]:cursor-not-allowed data-[disabled]:opacity-70",
			/* Invalid */
			"group-data-[invalid]:text-destructive",
			className,
		)}
		{...props}
	/>
);
