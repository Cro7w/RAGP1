"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserProfileSchema = exports.insertUserSchema = exports.users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_zod_1 = require("drizzle-zod");
const zod_1 = require("zod");
exports.users = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.varchar)("id", { length: 36 }).primaryKey(),
    username: (0, pg_core_1.text)("username").notNull(),
    password: (0, pg_core_1.text)("password").notNull(),
    displayName: (0, pg_core_1.text)("displayName"),
    avatar: (0, pg_core_1.text)("avatar"),
}, (table) => ({
    usernameUnique: (0, pg_core_1.uniqueIndex)("username"), // <— pass the column name
}));
exports.insertUserSchema = (0, drizzle_zod_1.createInsertSchema)(exports.users).pick({
    username: true,
    password: true,
});
exports.updateUserProfileSchema = zod_1.z.object({
    displayName: zod_1.z.string().min(1).max(50),
    avatar: zod_1.z.string().min(1),
});
