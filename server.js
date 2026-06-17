import express from "express";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

// Serve static files
app.use(express.static(__dirname));

// API endpoint to get the OPENROUTER_FREE_KEY
app.get("/api/config", (req, res) => {
  res.json({
    openRouterKey: process.env.OPENROUTER_FREE_KEY || "",
  });
});

// Serve the HTML file with injected env variables
app.get("/", (req, res) => {
  let html = fs.readFileSync(`${__dirname}/PDF Study Guide.html`, "utf8");

  // Inject the environment variable into the HTML
  html = html.replace(
    'const OPENROUTER_FREE_KEY =\n          "sk-or-v1-',
    `const OPENROUTER_FREE_KEY = "${process.env.OPENROUTER_FREE_KEY || "sk-or-v1-"}`,
  );

  res.send(html);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(
    `Using OPENROUTER_FREE_KEY: ${process.env.OPENROUTER_FREE_KEY?.slice(0, 20)}...`,
  );
});
