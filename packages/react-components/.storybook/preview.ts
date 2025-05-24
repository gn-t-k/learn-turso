import type { Preview } from "@storybook/react";
import "../index.css";

export default {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		darkMode: {
			stylePreview: true,
		},
	},
} satisfies Preview;
