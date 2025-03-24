import { Fallback, Image, Root } from "@radix-ui/react-avatar";
import type { ComponentProps, FC } from "react";
import { cn } from "../../utilities/cn";

const Avatar: FC<ComponentProps<typeof Root>> = ({ className, ...props }) => {
	return (
		<Root
			data-slot="avatar"
			className={cn(
				"relative flex size-8 shrink-0 overflow-hidden rounded-full",
				className,
			)}
			{...props}
		/>
	);
};

const AvatarImage: FC<ComponentProps<typeof Image>> = ({
	className,
	...props
}) => {
	return (
		<Image
			data-slot="avatar-image"
			className={cn("aspect-square size-full", className)}
			{...props}
		/>
	);
};

const AvatarFallback: FC<ComponentProps<typeof Fallback>> = ({
	className,
	...props
}) => {
	return (
		<Fallback
			data-slot="avatar-fallback"
			className={cn(
				"flex size-full items-center justify-center rounded-full bg-muted",
				className,
			)}
			{...props}
		/>
	);
};

export { Avatar, AvatarImage, AvatarFallback };
