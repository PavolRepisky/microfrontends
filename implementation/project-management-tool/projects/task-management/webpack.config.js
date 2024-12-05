const path = require("path");
const fs = require("fs");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const deleteFiles = (files) => {
  files.forEach((file) => {
    try {
      if (fs.existsSync(file)) {
        fs.unlinkSync(file);
        console.log(`Deleted: ${file}`);
      }
    } catch (err) {
      console.error(`Error deleting ${file}:`, err);
    }
  });
};

const inputFiles = [
  path.resolve(__dirname, "../../dist/task-management/browser/polyfills.js"),
  path.resolve(__dirname, "../../dist/task-management/browser/styles.css"),
  path.resolve(__dirname, "../../dist/task-management/browser/main.js"),
  path.resolve(__dirname, "../../dist/task-management/browser/scripts.js"),
];

module.exports = {
  entry: {
    "bundle.js": inputFiles,
  },
  output: {
    filename: "[name]",
    path: path.resolve(__dirname, "../../dist/task-management/browser"),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()],
  infrastructureLogging: {
    level: "info",
  },
  plugins: [
    {
      apply: (compiler) => {
        compiler.hooks.done.tap("DeleteInputFilesPlugin", () => {
          console.log("Cleaning up input files...");
          deleteFiles(inputFiles);
        });
      },
    },
  ],
};
