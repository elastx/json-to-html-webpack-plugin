const fs = require("fs");
const path = require("path");
const ejs = require("ejs");

class JSONToHTMLWebpackPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    const { webpack } = compiler;
    const { Compilation } = webpack;
    const { RawSource } = webpack.sources;

    compiler.hooks.thisCompilation.tap(
      "JSONToHTMLWebpackPlugin",
      (compilation) => {
        compilation.hooks.processAssets.tap(
          {
            name: "JSONToHTMLWebpackPlugin",
            stage: compilation.PROCESS_ASSETS_STAGE_ADDITIONS,
          },
          () => {
            const rawData = {};
            this.options.jsonFiles.forEach((jsonFile) => {
              const jsonFilePath = path.resolve(jsonFile);
              const jsonData = JSON.parse(
                fs.readFileSync(jsonFilePath, "utf8")
              );
              rawData[path.basename(jsonFilePath, ".json")] = jsonData;
            });

            const data = this.options.transformer(rawData);

            const htmlFilePath = `${this.options.target}index.html`;

            ejs.renderFile(this.options.template, data, (err, html) => {
              if (err) {
                throw err;
              }

              compilation.emitAsset(htmlFilePath, new RawSource(html));
            });
          }
        );
      }
    );
  }
}

module.exports = JSONToHTMLWebpackPlugin;
