import { pgTable, text, varchar, uniqueIndex } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable(
  "users",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    username: text("username").notNull(),
    password: text("password").notNull(),
    displayName: text("displayName"),
    avatar: text("avatar"),
  },
  (table) => ({
    usernameUnique: uniqueIndex("username"), // <— pass the column name
  })
);

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const updateUserProfileSchema = z.object({
  displayName: z.string().min(1).max(50),
  avatar: z.string().min(1),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type UpdateUserProfile = z.infer<typeof updateUserProfileSchema>;
export type User = typeof users.$inferSelect;
