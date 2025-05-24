import type { StorybookConfig } from "@storybook/react-vite";

// biome-ignore lint/correctness/noNodejsModules: <explanation>
import { dirname, join } from "node:path";

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
type GetAbsolutePath = (value: string) => string;
const getAbsolutePath: GetAbsolutePath = (value) => {
	return dirname(require.resolve(join(value, "package.json")));
};

export default {
	stories: ["../src/**/*.stories.tsx"],
	addons: [
		getAbsolutePath("@storybook/addon-essentials"),
		getAbsolutePath("@storybook/addon-onboarding"),
		getAbsolutePath("@chromatic-com/storybook"),
		getAbsolutePath("@storybook/experimental-addon-test"),
		getAbsolutePath("storybook-dark-mode"),
	],
	framework: {
		name: getAbsolutePath("@storybook/react-vite"),
		options: {},
	},
} satisfies StorybookConfig;
