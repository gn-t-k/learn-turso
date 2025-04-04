import type { FC } from "react";
import {
	Dialog as AriaDialog,
	type DialogProps as AriaDialogProps,
	DialogTrigger as AriaDialogTrigger,
	Popover as AriaPopover,
	type PopoverProps as AriaPopoverProps,
	composeRenderProps,
} from "react-aria-components";
import { cn } from "../../utilities/cn";

export const PopoverTrigger = AriaDialogTrigger;

export const Popover: FC<AriaPopoverProps> = ({
	className,
	offset = 4,
	...props
}) => {
	return (
		<AriaPopover
			offset={offset}
			className={composeRenderProps(className, (className) =>
				cn(
					"z-50 rounded-md border bg-popover text-popover-foreground shadow-md outline-none",
					/* Entering */
					"data-[entering]:fade-in-0 data-[entering]:zoom-in-95 data-[entering]:animate-in",
					/* Exiting */
					"data-[exiting]:fade-out-0 data-[exiting]:zoom-out-95 data-[exiting]:animate-out",
					/* Placement */
					"data-[placement=bottom]:slide-in-from-top-2 data-[placement=left]:slide-in-from-right-2 data-[placement=right]:slide-in-from-left-2 data-[placement=top]:slide-in-from-bottom-2",
					className,
				),
			)}
			{...props}
		/>
	);
};

export const PopoverDialog: FC<AriaDialogProps> = ({ className, ...props }) => {
	return <AriaDialog className={cn("p-4 outline-0", className)} {...props} />;
};
