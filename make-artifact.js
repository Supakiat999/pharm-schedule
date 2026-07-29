/* Extracts the app out of index.html into artifact/schedule.html for publishing.
   The Artifact host supplies its own <head>, so the standalone wrapper is stripped.
   Run:  node make-artifact.js                                                   */
const fs = require("fs");
const path = require("path");

const src = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");
const start = src.indexOf("<!--APP-START-->");
const end = src.indexOf("<!--APP-END-->");

if (start === -1 || end === -1) {
  console.error("Could not find <!--APP-START--> / <!--APP-END--> in index.html");
  process.exit(1);
}

const body = src.slice(start + "<!--APP-START-->".length, end).trim();
fs.mkdirSync(path.join(__dirname, "artifact"), { recursive: true });
fs.writeFileSync(path.join(__dirname, "artifact", "schedule.html"), body + "\n", "utf8");

console.log("wrote artifact/schedule.html  (" + body.length + " bytes)");
