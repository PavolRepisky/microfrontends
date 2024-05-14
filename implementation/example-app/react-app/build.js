const fs = require("fs");
const path = require("path");

const jsFilesDir = "./build/static/js";
const cssFilesDir = "./build/static/css";
const outputDir = "./elements";

fs.readdir(jsFilesDir, (err, files) => {
  if (err) {
    console.error("Error reading js directory:", err);
    return;
  }
  const jsFiles = files.filter((file) => path.extname(file) === ".js");

  let concatenatedContent = "";
  jsFiles.forEach((file) => {
    const filePath = path.join(jsFilesDir, file);
    concatenatedContent += fs.readFileSync(filePath, "utf8") + ";";
  });

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  const outputFilePath = path.join(outputDir, "react-bundle.js");
  fs.writeFileSync(outputFilePath, concatenatedContent, "utf8");

  console.log("Files concatenated successfully. Output file:", outputFilePath);
});

fs.readdir(cssFilesDir, (err, files) => {
  if (err) {
    console.error("Error reading css directory:", err);
    return;
  }
  const cssFile = files.find((file) => path.extname(file) === ".css");

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  const srcFilePath = path.join(cssFilesDir, cssFile);
  const destFilePath = path.join(outputDir, "react-styles.css");

  fs.copyFileSync(srcFilePath, destFilePath);
  console.log("CSS file copied successfully.");
});
