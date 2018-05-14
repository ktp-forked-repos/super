import fs from "fs";
import path from "path";
import flow from "rollup-plugin-flow";
import buble from "rollup-plugin-buble";
import { minify } from "uglify-js";
import saveLicense from "uglify-save-license";

const copyright = fs.readFileSync(path.resolve("../shared/COPYRIGHT"), "utf-8");

const NAME = path.basename(process.cwd());
const SRC_DIR = path.resolve("src");
const DIST_DIR = path.resolve("lib");

export default {
  input: path.join(SRC_DIR, `lib/${NAME}.js`),
  output: {
    name: NAME,
    banner: copyright,
    file: path.join(DIST_DIR, `${NAME}.js`),
    format: "umd"
  },
  plugins: [
    flow({ pretty: true }),
    buble({ transforms: { dangerousForOf: true } }),
    {
      name: "uglify",
      transformBundle(code) {
        const result = minify(code, {
          fromString: true,
          mangle: { toplevel: true },
          output: { max_line_len: 2048, comments: saveLicense },
          compress: { comparisons: true, pure_getters: true, unsafe: true }
        });

        if (!fs.existsSync(DIST_DIR)) {
          fs.mkdirSync(DIST_DIR);
        }

        fs.writeFileSync(path.join(DIST_DIR, `${NAME}.min.js`), result.code, "utf8");
      }
    }
  ]
};