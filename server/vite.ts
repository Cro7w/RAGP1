import { Application } from "express";
import { createServer as createViteServer, ViteDevServer } from "vite";
import path from "path";
import express from "express";

let vite: ViteDevServer;

export async function setupVite(app: Application) {
  vite = await createViteServer({
    server: { middlewareMode: true }, // ✅ correct type
    appType: "custom",
  });

  app.use(vite.middlewares);
}

export function serveStatic(app: Application) {
  app.use(express.static(path.join(process.cwd(), "dist/client")));
}

export function log(message: string) {
  console.log(message);
}
