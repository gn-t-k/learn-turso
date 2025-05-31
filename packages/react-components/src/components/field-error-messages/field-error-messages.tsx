import type { ComponentProps, FC } from "react";
import { FieldError as AriaFieldError } from "react-aria-components";

type FieldErrorMessagesProps = ComponentProps<"ul"> & {
	errors: string[] | undefined;
};
export const FieldErrorMessages: FC<FieldErrorMessagesProps> = ({
	errors,
	...props
}) => {
	if (errors === undefined || errors.length === 0) {
		return null;
	}

	return (
		<ul {...props}>
			{errors.map((error) => (
				<li key={error}>
					<AriaFieldError className="font-medium text-destructive text-sm">
						{error}
					</AriaFieldError>
				</li>
			))}
		</ul>
	);
};
