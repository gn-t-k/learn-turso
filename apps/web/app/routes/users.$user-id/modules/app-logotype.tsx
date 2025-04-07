import { cn } from "@packages/react-components/src/utilities/cn";
import type { ComponentProps, FC } from "react";

export const AppLogotype: FC<ComponentProps<"span">> = ({
	className,
	...props
}) => {
	return (
		<span className={cn([className, "font-bold text-xl"])} {...props}>
			TODO App
		</span>
	);
};
