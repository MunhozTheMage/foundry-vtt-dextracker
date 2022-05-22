import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { RollupOptions, RollupWarning } from "rollup";

const ignoreWarnings =
  (warnings: RollupWarning["code"][]) => (warning: RollupWarning) => {
    if (warnings.includes(warning.code)) return;
    console.warn(warning.message);
  };

export default {
  input: "compiled/scripts/module.js",
  output: {
    file: "dist/module.js",
    format: "iife",
  },
  plugins: [commonjs(), nodeResolve()],
  onwarn: ignoreWarnings(["THIS_IS_UNDEFINED"]),
} as RollupOptions;
