import eslintConfig from "@azat-io/eslint-config-react";
import perfectionistAlphabetical from "eslint-plugin-perfectionist/configs/recommended-alphabetical";
import typescriptEnum from "eslint-plugin-typescript-enum";
import { defineFlatConfig } from "eslint-define-config";
import { FlatCompat } from "@eslint/eslintrc";
import jsdoc from "eslint-plugin-jsdoc";

const compat = new FlatCompat();

const config = eslintConfig.filter((value) => {
	return !Array.isArray(value?.["plugins"]);
});

export default defineFlatConfig([
	...config,
	perfectionistAlphabetical,
	...compat.config({
		rules: {
			"unicorn/prevent-abbreviations": [
				"error",
				{
					ignore: ["env", "Env"],
				},
			],
		},
		ignorePatterns: ["!.storybook", "storybook-static"],
	}),
	{
		rules: {
			"unicorn/filename-case": [
				"error",
				{
					cases: { kebabCase: true },
				},
			],
			"arrow-body-style": "off",
		},
	},
	{
		rules: {
			"@typescript-eslint/consistent-type-definitions": ["error", "type"],
			"@typescript-eslint/no-redeclare": "off",
			"jsdoc/require-returns-description": 2,
			"jsdoc/require-description": 2,
			"jsdoc/require-returns": 2,
			"jsdoc/require-jsdoc": 2,
		},
		plugins: {
			"typescript-enum": typescriptEnum,
			jsdoc,
		},
		files: ["**/*.ts", "**/*.tsx"],
	},
	{
		ignores: ["eslint.config.js", "public/*", "dist", "build"],
	},
]);
