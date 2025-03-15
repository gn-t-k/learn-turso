import { Authenticator } from "remix-auth";
import { googleStrategy } from "./google-strategy.server";
import type { SessionUser } from "./user-session-manager.server";

const authenticator = new Authenticator<SessionUser>();

const google = "google";

authenticator.use(googleStrategy, google);

type AuthenticateByGoogle = (request: Request) => Promise<SessionUser>;
export const authenticateByGoogle: AuthenticateByGoogle = async (request) => {
	return await authenticator.authenticate(google, request);
};
