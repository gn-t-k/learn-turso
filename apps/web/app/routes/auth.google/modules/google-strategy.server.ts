import { GoogleStrategy } from "@coji/remix-auth-google";
import acceptLanguage from "accept-language";
import { href } from "react-router";
import type { OAuth2Strategy } from "remix-auth-oauth2";
import invariant from "tiny-invariant";
import { ulid } from "ulid";
import { createOrUpdateUser } from "./create-or-update-user.server";
import { createUserAuthenticatedEvent } from "./create-user-authenticated-event.server";
import { findLastAuthenticatedEvent } from "./find-last-authenticated-event.server";
import type { SessionUser } from "./user-session-manager.server";

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
	(props) => verifyUser(props),
);

const verifyUser: OAuth2Strategy<SessionUser>["verify"] = async ({
	request,
	tokens,
}) => {
	const { email, name, imageUrl } = await getProfile(request, tokens);

	const lastAuthenticatedEvent = await findLastAuthenticatedEvent({
		email,
		authenticatedBy: "google",
	});
	const isFirstTime = lastAuthenticatedEvent === undefined;
	const userId = isFirstTime ? ulid() : lastAuthenticatedEvent.userId;

	const [user, userAuthenticatedEvent] = await Promise.all([
		createOrUpdateUser({ id: userId, email, name, imageUrl }),
		createUserAuthenticatedEvent({
			id: ulid(),
			userId,
			authenticatedBy: "google",
			authenticatedAt: new Date(),
		}),
	]);

	if (user === undefined) {
		throw new Error("usersのupsertクエリが失敗しました");
	}
	if (userAuthenticatedEvent === undefined) {
		throw new Error("user_authenticated_eventsのinsertクエリが失敗しました");
	}

	return {
		id: user.id,
		email,
		name: user.name,
		imageUrl: user.imageUrl,
	};
};

type GetProfile = (
	request: Request,
	tokens: Tokens,
) => Promise<{ email: string; name: string; locale: string; imageUrl: string }>;
type Tokens = Parameters<OAuth2Strategy<SessionUser>["verify"]>[0]["tokens"];
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
