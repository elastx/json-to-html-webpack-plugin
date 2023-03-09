# JSONToHTMLWebpackPlugin

A webpack plugin to convert JSON data to HTML pages. This plugin reads JSON files, transforms the data (if a transformer is provided), and then renders the data using a handlebars template to generate an HTML file.

## Installation

```bash
npm install json-to-html-webpack-plugin
```

## Usage

Add the plugin to your webpack configuration file:

```javascript
const JSONToHTMLWebpackPlugin = require("json-to-html-webpack-plugin");

module.exports = {
  // ...
  plugins: [
    new JSONToHTMLWebpackPlugin({
      pages: [
        {
          jsonFiles: ["./data/data1.json"],
          template: "./template.hbs",
          outputFile: "index.html",
        },
        {
          jsonFiles: ["./data/data2.json", "./data/data3.json"],
          transformer: (data) => {
            // Transform data
            return transformedData;
          },
          template: "./template2.hbs",
          outputFile: "about.html",
        },
      ],
    }),
  ],
};
```

In the example above, the plugin is configured to generate two HTML pages. The first page is generated from the data1.json file and the template.hbs file. The second page is generated from the data2.json and data3.json files and the template2.hbs file.

The plugin supports the following options:

- `pages` (required): An array of objects, each representing a page to be generated. Each object must contain the following properties:

  - `jsonFiles` _(required)_: An array of strings, each representing a path to a JSON file.
  - `template` _(required)_: A string representing a path to a handlebars template file.
  - `outputFile` _(required)_: A string representing the name of the output HTML file.
  - `transformer` _(optional)_: A function that takes the raw JSON data and returns transformed data.

## Strengths

- The plugin only re-emits files which dependencies have changed. This means that if you change a JSON file, only the HTML file that depends on that JSON file will be re-emitted.

## Limitations

- The plugin does not support multiple JSON files that are not dependent on each other. For example, if you have two JSON files, `data1.json` and `data2.json`, and you want to generate two HTML files, `index.html` and `about.html`, from these two JSON files, you will need to configure two pages in the plugin. The plugin does not support a single page that generates two HTML files from two JSON files.
- The plugin only supports handlebars templates. It does not support other template engines at this time.
