import { cn } from "@packages/react-components/src/utilities/cn";
import type { ComponentProps, FC } from "react";

export const HeaderContainer: FC<ComponentProps<"header">> = ({
	className,
	...props
}) => {
	return (
		<header
			className={cn([
				className,
				"sticky top-0 z-10 bg-background p-4 shadow-md",
			])}
			{...props}
		/>
	);
};
