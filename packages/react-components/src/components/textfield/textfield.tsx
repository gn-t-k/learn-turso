import clsx from "clsx";
import type { ComponentProps, FC } from "react";
import { TextField as AriaTextField } from "react-aria-components";

export const TextField: FC<ComponentProps<typeof AriaTextField>> = ({
	className,
	...props
}) => {
	return <AriaTextField {...props} className={clsx(className, "group")} />;
};
