import type { FC } from "react";
import {
	Text as AriaText,
	type TextProps as AriaTextProps,
} from "react-aria-components";
import { cn } from "../../utilities/cn";

export const FieldDescription: FC<AriaTextProps> = ({
	className,
	...props
}) => {
	return (
		<AriaText
			className={cn("text-muted-foreground text-sm", className)}
			{...props}
			slot="description"
		/>
	);
};
