"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupVite = setupVite;
exports.serveStatic = serveStatic;
exports.log = log;
const vite_1 = require("vite");
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
let vite;
async function setupVite(app) {
    vite = await (0, vite_1.createServer)({
        server: { middlewareMode: true }, // ✅ correct type
        appType: "custom",
    });
    app.use(vite.middlewares);
}
function serveStatic(app) {
    app.use(express_1.default.static(path_1.default.join(process.cwd(), "dist/client")));
}
function log(message) {
    console.log(message);
}
