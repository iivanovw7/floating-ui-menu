/** @type {import('stylelint').Config} */
export default {
	extends: "@azat-io/stylelint-config",
	ignoreFiles: ["**/*.js", "**/*.ts", "**/*.tsx"],
	rules: {
		"block-no-empty": true,
		"length-zero-no-unit": [
			true,
			{
				ignore: ["custom-properties"],
			},
		],
		"max-nesting-depth": [
			4,
			{
				ignore: ["pseudo-classes"],
			},
		],
		"order/order": [
			[
				{
					name: "include",
					type: "at-rule",
				},
			],
			{
				disableFix: true,
			},
		],
		"order/properties-alphabetical-order": null,
		"order/properties-order": [],
		"property-no-unknown": [
			true,
			{
				ignoreSelectors: [":export"],
			},
		],
		"selector-class-pattern":
			"([A-Za-z0-9]+(?:-[A-Za-z0-9]+)*)(?:__([A-Za-z0-9]+(?:-[A-Za-z0-9]+)*))?(?:--([A-Za-z0-9]+(?:-[A-Za-z0-9]+)*))?",
		"selector-max-id": 1,
		"selector-no-qualifying-type": null,
		"function-disallowed-list": ["hsl", "hsla"],
		"color-function-notation": "legacy",
	},
};
