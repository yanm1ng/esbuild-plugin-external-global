const { build } = require("esbuild");

const production = process.env.NODE_ENV === "production";
const formats = ["cjs", "esm"];

(async () => {
  for (const format of formats) {
    await build({
      entryPoints: ["./src/index.ts"],
      watch: !production,
      format,
      outfile: `./dist/index${format === "cjs" ? "" : "." + format}.js`
    });
  }
})();