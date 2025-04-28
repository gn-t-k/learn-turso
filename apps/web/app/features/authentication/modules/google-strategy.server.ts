import { GoogleStrategy } from "@coji/remix-auth-google";
import acceptLanguage from "accept-language";
import { href } from "react-router";
import type { OAuth2Strategy } from "remix-auth-oauth2";
import type { Strategy } from "remix-auth/strategy";
import invariant from "tiny-invariant";
import { createOrUpdateUser } from "./create-or-update-user.server";
import type { SessionUser } from "./session-user";

const clientId = process.env["GOOGLE_AUTH_CLIENT_ID"];
invariant(clientId, "環境変数`GOOGLE_AUTH_CLIENT_ID`が設定されていません");

const clientSecret = process.env["GOOGLE_AUTH_CLIENT_SECRET"];
invariant(
	clientSecret,
	"環境変数`GOOGLE_AUTH_CLIENT_SECRET`が設定されていません",
);

const isDev = process.env["NODE_ENV"] === "development";
const devOrigin = "http://localhost:5173";
const prodOrigin = "https://example.com";
// biome-ignore lint/style/useNamingConvention: @coji/remix-auth-google
const redirectURI = `${isDev ? devOrigin : prodOrigin}${href("/auth/google/callback")}`;

export const googleStrategy = new GoogleStrategy(
	{ clientId, clientSecret, redirectURI },
	async ({ request, tokens }) => verifyUser({ request, tokens }),
);

type VerifyUser = Strategy.VerifyFunction<
	SessionUser,
	OAuth2Strategy.VerifyOptions
>;
const verifyUser: VerifyUser = async ({ request, tokens }) => {
	const profile = await getProfile(request, tokens);
	const user = await createOrUpdateUser({
		name: profile.name,
		email: profile.email,
		imageUrl: profile.imageUrl,
	});

	return {
		id: user.id,
		email: user.email,
		name: user.name,
		imageUrl: user.imageUrl,
	};
};

type GetProfile = (
	request: Request,
	tokens: Tokens,
) => Promise<{ email: string; name: string; locale: string; imageUrl: string }>;
type Tokens = Parameters<VerifyUser>[0]["tokens"];
const getProfile: GetProfile = async (request, tokens) => {
	const profile = await GoogleStrategy.userProfile(tokens);
	const name = profile.displayName;
	const email = profile.emails[0].value;
	const imageUrl = profile.photos[0].value;
	const locale =
		profile._json.locale ??
		acceptLanguage.get(request.headers.get("accept-language")) ??
		"en";

	return { email, name, locale, imageUrl };
};
