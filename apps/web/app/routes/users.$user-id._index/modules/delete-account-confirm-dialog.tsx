import { Button } from "@packages/react-components";
import { cn } from "@packages/react-components/src/utilities/cn";
import type { FC } from "react";

type Props = {
	busy: boolean;
	close: () => void;
	deleteAccount: () => void;
};
export const DeleteAccountConfirmDialog: FC<Props> = ({
	busy,
	close,
	deleteAccount,
}) => {
	return (
		<div className="grid gap-4">
			<p>Are you sure you want to delete your account?</p>
			<div
				className={cn(
					"grid justify-items-stretch gap-2",
					"sm:grid-flow-col sm:justify-end sm:justify-items-start",
				)}
			>
				<Button onClick={close} variant="outline">
					Cancel
				</Button>
				<Button variant="destructive" onClick={deleteAccount} isDisabled={busy}>
					Delete
				</Button>
			</div>
		</div>
	);
};
