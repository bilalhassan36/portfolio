import pluginNext from "@next/eslint-plugin-next";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tseslint from "typescript-eslint";

const eslintConfig = [
  {
    ignores: [
      // Dependencies
      "**/node_modules/**",
      // Build outputs
      "**/.next/**",
      "**/out/**",
      "**/dist/**",
      "**/build/**",
      // Cache
      "**/.cache/**",
      "**/.turbo/**",
      // Config files
      "*.config.js",
      "*.config.mjs",
      "*.config.ts",
      // Public assets
      "**/public/**",
      // Lock files & generated
      "**/*.lock",
      "**/bun.lock",
      "**/*.min.js",
      "**/*.min.css",
      // Coverage
      "**/coverage/**",
    ],
  },
  ...tseslint.configs.recommended,
  {
    plugins: {
      "@next/next": pluginNext,
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs["core-web-vitals"].rules,
    },
  },
  {
    plugins: {
      react: pluginReact,
      "react-hooks": pluginReactHooks,
    },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      "react/self-closing-comp": "error",
      "react/jsx-curly-brace-presence": [
        "error",
        { props: "never", children: "never" },
      ],
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      // Import sorting rules
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // React imports first
            ["^react"],
            // NextJs Imports
            ["^next"],
            // External packages
            ["^@?\\w"],
            // Internal aliases (starting with @/)
            ["^@/"],
            // Parent imports
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
            // Same-folder imports
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
            // Style imports
            ["^.+\\.s?css$"],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
    },
  },
  eslintPluginPrettier,
  {
    rules: {
      // Best practices
      "no-console": "warn",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],
    },
  },
];

export default eslintConfig;
