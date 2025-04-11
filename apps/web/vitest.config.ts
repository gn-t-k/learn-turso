import { defineConfig } from "vite";

export default defineConfig({
	test: {
		mockReset: true,
		clearMocks: true,
		restoreMocks: true,
	},
});
