import type { FC } from "react";
import {
	FieldError as AriaFieldError,
	type FieldErrorProps as AriaFieldErrorProps,
} from "react-aria-components";
import { cn } from "../../utilities/cn";

export const FieldError: FC<AriaFieldErrorProps> = ({
	className,
	...props
}) => (
	<AriaFieldError
		className={cn("font-medium text-destructive text-sm", className)}
		{...props}
	/>
);
