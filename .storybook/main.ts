/* eslint-disable @typescript-eslint/no-require-imports */
const path = require("node:path");

module.exports = {
	addons: ["@storybook/addon-a11y", "@storybook/addon-essentials", "@chromatic-com/storybook"],
	core: {
		disableTelemetry: true,
	},
	docs: {},
	features: {
		storyStoreV7: true,
	},
	framework: {
		name: "@storybook/react-vite",
		options: {},
	},
	stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
	typescript: {
		reactDocgen: "react-docgen-typescript",
	},
	viteFinal: async (config) => {
		// because rollup does not respect NODE_PATH
		config.build.rollupOptions = {
			plugins: {
				resolveId: (code) => {
					if (code === "react") {
						return path.resolve(require.resolve("react"));
					}

					return null;
				},
			},
		};

		return config;
	},
};
