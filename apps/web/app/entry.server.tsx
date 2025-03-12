import { isbot } from "isbot";
import { renderToReadableStream } from "react-dom/server";
import type { AppLoadContext, EntryContext } from "react-router";
import { ServerRouter } from "react-router";

const handleRequest = async (
	request: Request,
	initialStatusCode: number,
	responseHeaders: Headers,
	routerContext: EntryContext,
	_loadContext: AppLoadContext,
): Promise<Response> => {
	const body = await handleRendering(
		renderToReadableStream(
			<ServerRouter context={routerContext} url={request.url} />,
			{
				onError: (error: unknown) => {
					handleError(error);

					/**
					 * 二重のエラーログを防ぐため
					 * 初期レンダリング中に発生したエラーはhandleDocumentRequestでログ出力済み
					 */
					if (isRenderCompleted()) {
						// biome-ignore lint/suspicious/noConsole: <explanation>
						console.error(error);
					}
				},
			},
		),
	);

	const userAgent = request.headers.get("user-agent");
	if ((userAgent && isbot(userAgent)) || routerContext.isSpaMode) {
		// SEO対策、クローラーのため
		await body.allReady;
	}

	responseHeaders.set("Content-Type", "text/html");

	return new Response(body, {
		headers: responseHeaders,
		status: hasSomeErrors() ? 500 : initialStatusCode,
	});
};
export default handleRequest;

type RenderingEvent = "start" | "end" | "error";
const renderingEvents: RenderingEvent[] = [];

const renderingErrors: unknown[] = [];

type HandleRendering = <T>(rendering: Promise<T>) => Promise<T>;
const handleRendering: HandleRendering = async (rendering) => {
	renderingEvents.push("start");
	const rendered = await rendering;
	renderingEvents.push("end");
	return rendered;
};

type HandleError = (error: unknown) => void;
const handleError: HandleError = (error) => {
	renderingEvents.push("error");
	renderingErrors.push(error);
};

type IsRenderCompleted = () => boolean;
const isRenderCompleted: IsRenderCompleted = () =>
	renderingEvents.includes("end");

type HasSomeErrors = () => boolean;
const hasSomeErrors: HasSomeErrors = () => renderingErrors.length > 0;
