import { createCookie } from "react-router";
import invariant from "tiny-invariant";

const nodeEnv = process.env["NODE_ENV"];
invariant(nodeEnv, "環境変数`NODE_ENV`が設定されていません");

export const redirectToSearchParams = "redirect_to";

const redirectToCookie = createCookie("redirect_to", {
	path: "/",
	httpOnly: true,
	sameSite: "lax",
	maxAge: 60,
	secure: nodeEnv === "production",
});

type SetRedirectTo = (href: string) => Promise<Headers>;
export const setRedirectTo: SetRedirectTo = async (href) => {
	return new Headers({
		"Set-Cookie": await redirectToCookie.serialize(href),
	});
};

type GetRedirectTo = (request: Request) => Promise<string | undefined>;
export const getRedirectTo: GetRedirectTo = async (request) => {
	const cookieHeader = request.headers.get("Cookie");
	const redirectTo = await redirectToCookie.parse(cookieHeader);

	return redirectTo || undefined;
};
