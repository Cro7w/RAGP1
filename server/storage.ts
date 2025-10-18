import { type User, type InsertUser, type UpdateUserProfile } from "../shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserProfile(id: string, profile: UpdateUserProfile): Promise<User | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;

  constructor() {
    this.users = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id, displayName: null, avatar: null };
    this.users.set(id, user);
    return user;
  }

  async updateUserProfile(id: string, profile: UpdateUserProfile): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...profile };
    this.users.set(id, updatedUser);
    return updatedUser;
  }
}

export const storage = new MemStorage();
