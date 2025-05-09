import type { StorybookConfig } from "@storybook/react-vite";

// biome-ignore lint/correctness/noNodejsModules: <explanation>
import { dirname, join } from "node:path";

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string) {
	return dirname(require.resolve(join(value, "package.json")));
}
const config: StorybookConfig = {
	stories: ["../src/**/*.stories.tsx"],
	addons: [
		getAbsolutePath("@storybook/addon-essentials"),
		getAbsolutePath("@storybook/addon-onboarding"),
		getAbsolutePath("@chromatic-com/storybook"),
		getAbsolutePath("@storybook/experimental-addon-test"),
	],
	framework: {
		name: getAbsolutePath("@storybook/react-vite"),
		options: {},
	},
};
export default config;
