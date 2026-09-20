import { globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextVitals,
  ...nextTypeScript,
  globalIgnores([
    ".next*/**",
    "node_modules/**",
    "logs/**",
    "public/uploads/**",
  ]),
  {
    rules: {
      // Existing client components intentionally initialise or refresh local
      // state from effects. Refactor these incrementally rather than blocking
      // unrelated security and deployment work.
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/static-components": "off",
    },
  },
  {
    files: ["scripts/**/*.js", "*.cjs"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
];

export default eslintConfig;
