import {
	TextArea as AriaTextArea,
	type TextAreaProps as AriaTextAreaProps,
	composeRenderProps,
} from "react-aria-components";

import type { FC } from "react";
import { cn } from "../../utilities/cn";

export const Textarea: FC<AriaTextAreaProps> = ({ className, ...props }) => {
	return (
		<AriaTextArea
			className={composeRenderProps(className, (className) =>
				cn(
					"flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground",
					/* Focused */
					"data-[focused]:outline-none data-[focused]:ring-2 data-[focused]:ring-ring data-[focused]:ring-offset-2",
					/* Disabled */
					"data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
					/* Resets */
					"focus-visible:outline-none",
					className,
				),
			)}
			{...props}
		/>
	);
};
