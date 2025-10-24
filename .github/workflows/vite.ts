import { Application } from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import express from "express";

export async function setupVite(app: Application, server: any) {
  const vite = await createViteServer({
    server: { middlewareMode: "ssr" }
  });

  app.use(vite.middlewares);
}

export function serveStatic(app: Application) {
  app.use(express.static(path.join(process.cwd(), "dist/client")));
}

export function log(message: string) {
  console.log(message);
}
