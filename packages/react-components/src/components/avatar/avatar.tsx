import {
	type ComponentProps,
	type FC,
	createContext,
	use,
	useEffect,
	useLayoutEffect,
	useState,
} from "react";
import { cn } from "../../utilities/cn";

type ImageLoadingStatus = "idle" | "loading" | "loaded" | "error";

type AvatarContextValue = {
	imageLoadingStatus: ImageLoadingStatus;
	onImageLoadingStatusChange: (status: ImageLoadingStatus) => void;
};

const AvatarContext = createContext<AvatarContextValue | null>(null);

export const Avatar: FC<ComponentProps<"span">> = (props) => {
	const [imageLoadingStatus, setImageLoadingStatus] =
		useState<ImageLoadingStatus>("idle");

	return (
		<AvatarContext
			value={{
				imageLoadingStatus,
				onImageLoadingStatusChange: setImageLoadingStatus,
			}}
		>
			<span
				{...props}
				data-slot="avatar"
				className={cn(
					"relative flex size-8 shrink-0 overflow-hidden rounded-full",
					props.className,
				)}
			/>
		</AvatarContext>
	);
};

type AvatarImageProps = ComponentProps<"img"> & {
	onLoadingStatusChange?: (status: ImageLoadingStatus) => void;
};
export const AvatarImage: FC<AvatarImageProps> = ({
	src,
	onLoadingStatusChange = () => {
		/** noop */
	},
	...props
}) => {
	const context = use(AvatarContext);
	const imageLoadingStatus = useImageLoadingStatus(src, props);

	useLayoutEffect(() => {
		if (imageLoadingStatus !== "idle") {
			onLoadingStatusChange(imageLoadingStatus);
			context?.onImageLoadingStatusChange(imageLoadingStatus);
		}
	}, [
		context?.onImageLoadingStatusChange,
		imageLoadingStatus,
		onLoadingStatusChange,
	]);

	return imageLoadingStatus === "loaded" ? (
		<img
			{...props}
			data-slot="avatar-image"
			className={cn("aspect-square size-full", props.className)}
			src={src}
			alt={props.alt ?? ""}
		/>
	) : null;
};

type AvatarFallbackProps = ComponentProps<"span"> & {
	delayMs?: number;
};
export const AvatarFallback: FC<AvatarFallbackProps> = ({
	delayMs,
	...props
}) => {
	const context = use(AvatarContext);
	const [canRender, setCanRender] = useState(delayMs === undefined);

	useEffect(() => {
		if (delayMs !== undefined) {
			const timerId = window.setTimeout(() => setCanRender(true), delayMs);
			return () => {
				window.clearTimeout(timerId);
			};
		}
		return () => {
			/* noop */
		};
	}, [delayMs]);

	return canRender && context?.imageLoadingStatus !== "loaded" ? (
		<span
			{...props}
			data-slot="avatar-fallback"
			className={cn(
				"flex size-full items-center justify-center rounded-full bg-muted",
				props.className,
			)}
		/>
	) : null;
};

type UseImageLoadingStatus = (
	src: string | undefined,
	{ referrerPolicy, crossOrigin }: AvatarImageProps,
) => ImageLoadingStatus;
const useImageLoadingStatus: UseImageLoadingStatus = (
	src,
	{ referrerPolicy, crossOrigin },
) => {
	const [status, setStatus] = useState<ImageLoadingStatus>("idle");

	useLayoutEffect(() => {
		if (src === undefined) {
			setStatus("error");
			return;
		}

		let isMounted = true;
		const image = new window.Image();

		const updateStatus = (status: ImageLoadingStatus) => () => {
			if (!isMounted) {
				return;
			}
			setStatus(status);
		};

		setStatus("loading");

		image.onload = updateStatus("loaded");
		image.onerror = updateStatus("error");

		if (referrerPolicy !== undefined) {
			image.referrerPolicy = referrerPolicy;
		}
		if (typeof crossOrigin === "string") {
			image.crossOrigin = crossOrigin;
		}
		image.src = src;

		return () => {
			isMounted = false;
		};
	}, [src, referrerPolicy, crossOrigin]);

	return status;
};

// const Avatar: FC<ComponentProps<typeof Root>> = ({ className, ...props }) => {
// 	return (
// 		<Root
// 			data-slot="avatar"
// 			className={cn(
// 				"relative flex size-8 shrink-0 overflow-hidden rounded-full",
// 				className,
// 			)}
// 			{...props}
// 		/>
// 	);
// };

// const AvatarImage: FC<ComponentProps<typeof Image>> = ({
// 	className,
// 	...props
// }) => {
// 	return (
// 		<Image
// 			data-slot="avatar-image"
// 			className={cn("aspect-square size-full", className)}
// 			{...props}
// 		/>
// 	);
// };

// const AvatarFallback: FC<ComponentProps<typeof Fallback>> = ({
// 	className,
// 	...props
// }) => {
// 	return (
// 		<Fallback
// 			data-slot="avatar-fallback"
// 			className={cn(
// 				"flex size-full items-center justify-center rounded-full bg-muted",
// 				className,
// 			)}
// 			{...props}
// 		/>
// 	);
// };

// export { Avatar, AvatarImage, AvatarFallback };
