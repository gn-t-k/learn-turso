import {
	Input as AriaInput,
	type InputProps as AriaInputProps,
	composeRenderProps,
} from "react-aria-components";

import type { FC } from "react";
import { cn } from "../../utilities/cn";

export const Input: FC<AriaInputProps> = ({ className, ...props }) => {
	return (
		<AriaInput
			className={composeRenderProps(className, (className) =>
				cn(
					"flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-sm placeholder:text-muted-foreground",
					/* Disabled */
					"data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
					/* Focused */
					"data-[focused]:outline-none data-[focused]:ring-2 data-[focused]:ring-ring data-[focused]:ring-offset-2",
					/* Resets */
					"focus-visible:outline-none",
					className,
				),
			)}
			{...props}
		/>
	);
};
