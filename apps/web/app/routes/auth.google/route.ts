import { authenticateByGoogle } from "../../features/authentication/authenticator.server";
import type { Route } from "./+types/route";

export const loader = async ({ request }: Route.LoaderArgs) => {
	return await authenticateByGoogle(request);
};
