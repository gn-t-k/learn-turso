import { type VariantProps, cva } from "class-variance-authority";
import { X } from "lucide-react";
import type { ComponentProps, FC, HTMLAttributes } from "react";
import {
	Dialog as AriaDialog,
	type DialogProps as AriaDialogProps,
	DialogTrigger as AriaDialogTrigger,
	Heading as AriaHeading,
	type HeadingProps as AriaHeadingProps,
	Modal as AriaModal,
	ModalOverlay as AriaModalOverlay,
	type ModalOverlayProps as AriaModalOverlayProps,
	composeRenderProps,
} from "react-aria-components";
import { cn } from "../../utilities/cn";
import { Button } from "../button/button";

const Dialog = AriaDialog;

const sheetVariants = cva([
	"fixed z-50 gap-4 bg-background shadow-lg transition ease-in-out",
	/* Entering */
	"data-[entering]:duration-500 data-[entering]:animate-in",
	/* Exiting */
	"data-[exiting]:duration-300  data-[exiting]:animate-out",
]);

const DialogTrigger = AriaDialogTrigger;

const DialogOverlay: FC<AriaModalOverlayProps> = ({
	className,
	isDismissable = true,
	...props
}) => (
	<AriaModalOverlay
		isDismissable={isDismissable}
		className={composeRenderProps(className, (className) =>
			cn(
				"fixed inset-0 z-50 bg-black/80",
				/* Exiting */
				"data-[exiting]:fade-out-0 data-[exiting]:animate-out data-[exiting]:duration-300",
				/* Entering */
				"data-[entering]:fade-in-0 data-[entering]:animate-in",
				className,
			),
		)}
		{...props}
	/>
);

type DialogContentProps = Omit<ComponentProps<typeof AriaModal>, "children"> &
	VariantProps<typeof sheetVariants> & {
		children?: AriaDialogProps["children"];
		role?: AriaDialogProps["role"];
		closeButton?: boolean;
	};

const DialogContent: FC<DialogContentProps> = ({
	className,
	children,
	role,
	closeButton = true,
	...props
}) => (
	<AriaModal
		className={composeRenderProps(className, (className) =>
			cn(
				"-translate-x-1/2 -translate-y-1/2 fixed top-1/2 left-[50vw] z-50",
				"w-full max-w-lg sm:rounded-lg md:w-full",
				"border bg-background p-6 shadow-lg duration-200",
				"data-[entering]:fade-in-0 data-[exiting]:fade-out-0",
				"data-[entering]:zoom-in-95 data-[exiting]:zoom-out-95",
				"data-[entering]:animate-in data-[exiting]:animate-out data-[exiting]:duration-300",
				className,
			),
		)}
		{...props}
	>
		<AriaDialog
			role={role ?? "dialog"}
			className={cn("grid h-full gap-4 outline-none")}
		>
			{composeRenderProps(children, (children, renderProps) => (
				<>
					{children}
					{closeButton && (
						<Button
							onPress={renderProps.close}
							size="icon"
							variant="ghost"
							className="absolute top-2 right-2"
						>
							<X className="size-4" />
							<span className="sr-only">Close</span>
						</Button>
					)}
				</>
			))}
		</AriaDialog>
	</AriaModal>
);

const DialogHeader: FC<HTMLAttributes<HTMLDivElement>> = ({
	className,
	...props
}) => (
	<div
		className={cn("grid gap-1.5 text-center sm:text-left", className)}
		{...props}
	/>
);

const DialogFooter: FC<HTMLAttributes<HTMLDivElement>> = ({
	className,
	...props
}) => (
	<div
		className={cn(
			"flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-2",
			className,
		)}
		{...props}
	/>
);

const DialogTitle: FC<AriaHeadingProps> = ({ className, ...props }) => (
	<AriaHeading
		slot="title"
		className={cn(
			"font-semibold text-lg leading-none tracking-tight",
			className,
		)}
		{...props}
	/>
);

const DialogDescription: FC<HTMLAttributes<HTMLParagraphElement>> = ({
	className,
	...props
}) => (
	<p
		className={cn("gird gap-1.5 text-center sm:text-left", className)}
		{...props}
	/>
);

export {
	Dialog,
	DialogOverlay,
	DialogTrigger,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogFooter,
	DialogTitle,
};
export type { DialogContentProps };
