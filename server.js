import express from "express";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

// Serve static files (index.html, etc.)
app.use(express.static(__dirname));

// Expose the OpenRouter key from env to the front-end.
// NOTE: this sends the key to every visitor's browser. Fine for a private /
// trusted deployment; do not use a key you care about for a public site.
app.get("/api/config", (req, res) => {
  res.json({ openRouterKey: process.env.OPENROUTER_FREE_KEY || "" });
});

// Serve the app at root
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

// Railway provides PORT via env — must use it, not a hardcoded value
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
