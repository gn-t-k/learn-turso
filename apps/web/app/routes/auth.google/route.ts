import type { Route } from "./+types/route";
import { authenticateByGoogle } from "./authenticator.server";

export const loader = async ({ request }: Route.LoaderArgs) => {
	return await authenticateByGoogle(request);
};
