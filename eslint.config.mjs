import js from "@eslint/js";
import ts from "typescript-eslint";
import unicorn from "eslint-plugin-unicorn";
import * as importPlugin from "eslint-plugin-import-x";

export default ts.config(
  {
    ignores: ["**/dist/**"],
  },
  js.configs.recommended,
  ...ts.configs.recommendedTypeChecked,
  ...ts.configs.stylisticTypeChecked,
  {
    rules: {
      yoda: ["error"],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          fixStyle: "inline-type-imports",
        },
      ],
      "@typescript-eslint/consistent-type-definitions": ["off"],
      "@typescript-eslint/no-unsafe-declaration-merging": ["off"],
      "@typescript-eslint/no-unsafe-argument": ["off"],
      "@typescript-eslint/no-unsafe-member-access": ["off"],
      "@typescript-eslint/no-explicit-any": ["off"],
      "@typescript-eslint/no-empty-object-type": [
        "error",
        {
          allowInterfaces: "with-single-extends",
        },
      ],
      "@typescript-eslint/no-empty-function": ["off"],
      "@typescript-eslint/explicit-member-accessibility": [
        "error",
        {
          overrides: {
            constructors: "no-public",
          },
        },
      ],
      "@typescript-eslint/method-signature-style": ["error", "property"],
      "@typescript-eslint/no-import-type-side-effects": ["error"],
      "@typescript-eslint/ban-ts-comment": "error",
    },
  },
  {
    name: "imports",
    plugins: {
      import: importPlugin,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      unicorn,
    },
    rules: {
      "import/first": "error",
      "import/no-duplicates": "error",
      "import/no-mutable-exports": "error",
      "import/no-named-default": "error",
      "import/no-self-import": "error",
      "import/no-webpack-loader-syntax": "error",
      "import/order": "error",
    },
  },
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  }
);
