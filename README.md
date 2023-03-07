# JSON to HTML Webpack Plugin

## Usage

```js
const JSONToHTMLPlugin = require("json-to-html-webpack-plugin");

module.exports = {
  plugins: [
    new JSONToHTMLPlugin({
      template: "./src/template.html",
      target: "path/to/put/files/in/dist",
      jsonFiles: ["path/to/one.json", "path/to/another.json"],
      transformer: (allJsonData) => ({
        ...allJsonData.one,
        whatEverYouWant: allJsonData.another.specificData,
        otherData: allJsonData.another,
      }),
    }),
  ],
};
```

## Options

### `template`

Type: `string`

Path to the template file.

### `target`

Type: `string`

Path to put the generated files in.

### `jsonFiles`

Type: `string[]`

Paths to the JSON files to use.

Each file will be parsed as JSON and the data will be available in the transformer under the same name as the file.

### `transformer`

Type: `function`

Function to transform the JSON data into the data to be used in the template.

## License

MIT (http://www.opensource.org/licenses/mit-license.php)
