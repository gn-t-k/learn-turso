import type { Route } from "./+types/route";
import { authenticateByGoogle } from "./modules/authenticator.server";

export const loader = async ({ request }: Route.LoaderArgs) => {
	return await authenticateByGoogle(request);
};
