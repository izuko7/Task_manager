import "dotenv/config";
import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

// Better Auth AVANT express.json()
app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

const port = Number(process.env.PORT) || 3000;
app.listen(port, () => console.log(`Serveur sur http://localhost:${port}`));