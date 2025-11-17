import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const compat = new FlatCompat({
    baseDirectory: dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: [
        "**/build/",
        "**/dist/",
        "**/node_modules/",
        "**/.snapshots/",
        "**/*.min.js",
        "**/site/",
        "**/venv/",
    ],
}, ...compat.extends("eslint:recommended", "plugin:@typescript-eslint/recommended"), {
    languageOptions: {
        globals: {
            ...globals.node,
            ...globals.browser,
            ...globals.jest,
            document: false,
        },

        parser: tsParser,
        ecmaVersion: 2020,
        sourceType: "commonjs",

        parserOptions: {
            ecmaFeatures: {
                legacyDecorators: true,
                jsx: true,
            },
        },
    },

    settings: {
        react: {
            version: "18",
        },
    },

    rules: {
        "space-before-function-paren": 0,
        "react/prop-types": 0,
        "react/jsx-handler-names": 0,
        "react/jsx-fragments": 0,
        "react/no-unused-prop-types": 0,
        "import/export": 0,
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-empty-object-type": "off"
    },
}];
