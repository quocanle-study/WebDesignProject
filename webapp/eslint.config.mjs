import globals from "globals";
import pluginJs from "@eslint/js";
import prettier from "eslint-config-prettier";
import pluginPrettier from "eslint-plugin-prettier";

export default [
    {
        files: ["**/*.js"],
        languageOptions: {
            sourceType: "module",
            ecmaVersion: "latest",
            globals: {
                ...globals.node  // Add Node.js globals
            }
        },
        plugins: {
            prettier: pluginPrettier
        },
        rules: {
            "prettier/prettier": "error",
            "@typescript-eslint/no-unsafe-argument": "off",
            "@typescript-eslint/no-explicit-any": "off",
        }
    },
    {
        languageOptions: {
            globals: {
                ...globals.browser,  // Add browser globals
                Vue: true,
            }
        }
    },
    pluginJs.configs.recommended,
    prettier
];
