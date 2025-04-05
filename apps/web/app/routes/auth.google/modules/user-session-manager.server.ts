import { type Session, createCookieSessionStorage } from "react-router";
import invariant from "tiny-invariant";

const sessionSecret = process.env["SESSION_SECRET"];
invariant(sessionSecret, "環境変数`SESSION_SECRET`が設定されていません");

const nodeEnv = process.env["NODE_ENV"];
invariant(nodeEnv, "環境変数`NODE_ENV`が設定されていません");

export type SessionUser = {
	id: string;
	email: string;
	name: string;
	imageUrl: string;
};

type SessionStorage = { user: SessionUser };
const sessionStorage = createCookieSessionStorage<SessionStorage>({
	cookie: {
		name: "__session",
		httpOnly: true,
		path: "/",
		sameSite: "lax",
		secrets: [sessionSecret],
		secure: nodeEnv === "production",
	},
});

type GetSession = (
	request: Request,
) => Promise<Session<SessionStorage, SessionStorage>>;
const getSession: GetSession = async (request) => {
	return await sessionStorage.getSession(request.headers.get("Cookie"));
};

const sessionUserKey = "user";

type SaveSession = (
	request: Request,
) => (user: SessionUser) => Promise<Headers>;
export const saveSession: SaveSession = (request) => async (user) => {
	const session = await getSession(request);
	session.set(sessionUserKey, user);

	return new Headers({
		"Set-Cookie": await sessionStorage.commitSession(session),
	});
};

type GetSessionUser = (request: Request) => Promise<SessionUser | undefined>;
export const getSessionUser: GetSessionUser = async (request) => {
	const session = await getSession(request);

	return session.get(sessionUserKey);
};

type DestroySession = (request: Request) => Promise<Headers>;
export const destroySession: DestroySession = async (request) => {
	const session = await getSession(request);

	return new Headers({
		"Set-Cookie": await sessionStorage.destroySession(session),
	});
};
