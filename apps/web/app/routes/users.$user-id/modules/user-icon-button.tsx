import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Button,
} from "@packages/react-components";
import type { FC } from "react";

type Props = {
	userName: string;
	userImageUrl: string;
};
export const UserIconButton: FC<Props> = ({ userName, userImageUrl }) => {
	return (
		<Button variant="ghost" size="icon" aria-label={userName}>
			<Avatar>
				<AvatarImage src={userImageUrl} alt={userName} />
				<AvatarFallback>{userName}</AvatarFallback>
			</Avatar>
		</Button>
	);
};
