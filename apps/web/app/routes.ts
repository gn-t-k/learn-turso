import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	index("routes/_index/route.tsx"),
	route("auth/google", "routes/auth.google/route.ts"),
	route("auth/google/callback", "routes/auth.google.callback/route.ts"),
	route("login", "routes/login._index/route.tsx"),
	route("logout", "routes/logout._index/route.ts"),
	route("users/:userId", "routes/users.$user-id._index/route.tsx"),
	route("users/:userId/tasks", "routes/users.$user-id.tasks._index/route.tsx"),
] satisfies RouteConfig;
