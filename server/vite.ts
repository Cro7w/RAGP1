<<<<<<< HEAD
// server/vite.ts
import express from "express";
import { Server as HTTPServer } from "http";
import path from "path";

export async function setupVite(app: express.Express, server: HTTPServer) {
  console.log("Vite setup placeholder — app and server received");
  // You can later add real Vite dev server setup here
}

export function serveStatic(app: express.Express) {
  app.use(express.static(path.join(process.cwd(), "public")));
  console.log("Serving static files from public folder");
}

export function log(msg: string) {
  console.log(`[Server Log] ${msg}`);
}
=======
// server/vite.ts
import express from "express";
import { Server as HTTPServer } from "http";
import path from "path";

export async function setupVite(app: express.Express, server: HTTPServer) {
  console.log("Vite setup placeholder — app and server received");
  // You can later add real Vite dev server setup here
}

export function serveStatic(app: express.Express) {
  app.use(express.static(path.join(process.cwd(), "public")));
  console.log("Serving static files from public folder");
}

export function log(msg: string) {
  console.log(`[Server Log] ${msg}`);
}
>>>>>>> 61fa2a9 (Saved local changes before pull)
