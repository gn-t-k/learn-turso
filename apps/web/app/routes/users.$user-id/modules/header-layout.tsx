import { cn } from "@packages/react-components/src/utilities/cn";
import type { ComponentProps, FC } from "react";

export const HeaderLayout: FC<ComponentProps<"div">> = ({
	className,
	...props
}) => {
	return (
		<div
			className={cn([className, "grid min-h-screen grid-rows-[auto_1fr]"])}
			{...props}
		/>
	);
};
