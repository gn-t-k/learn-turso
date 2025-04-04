import { Slot } from "@radix-ui/react-slot";
import type { ComponentProps, FC } from "react";
import {
	Link as AriaLink,
	type LinkProps as AriaLinkProps,
	composeRenderProps,
} from "react-aria-components";
import { cn } from "../../utilities/cn";

export type TextLinkProps =
	| ({ asChild: true } & ComponentProps<typeof Slot>)
	| ({ asChild?: false } & AriaLinkProps);

export const TextLink: FC<TextLinkProps> = (props) => {
	if (props.asChild === true) {
		const { className, ...rest } = props;
		return <Slot className={cn(className, styles)} {...rest} />;
	}

	const { className, ...rest } = props;
	return (
		<AriaLink
			className={composeRenderProps(className, (className) =>
				cn([className, styles]),
			)}
			{...rest}
		/>
	);
};

const styles = cn([
	"inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md p-0 font-medium text-primary text-sm underline-offset-4 ring-offset-background transition-colors",
	/* Hovered */
	"data-[hovered]:underline",
	/* Disabled */
	"data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ",
	/* Focus Visible */
	"data-[focus-visible]:outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-ring data-[focus-visible]:ring-offset-2",
	/* Resets */
	"focus-visible:outline-none",
]);
