"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = exports.MemStorage = void 0;
const crypto_1 = require("crypto");
class MemStorage {
    constructor() {
        this.users = new Map();
    }
    async getUser(id) {
        return this.users.get(id);
    }
    async getUserByUsername(username) {
        return Array.from(this.users.values()).find((user) => user.username === username);
    }
    async createUser(insertUser) {
        const id = (0, crypto_1.randomUUID)();
        const user = { ...insertUser, id, displayName: null, avatar: null };
        this.users.set(id, user);
        return user;
    }
    async updateUserProfile(id, profile) {
        const user = this.users.get(id);
        if (!user)
            return undefined;
        const updatedUser = { ...user, ...profile };
        this.users.set(id, updatedUser);
        return updatedUser;
    }
}
exports.MemStorage = MemStorage;
exports.storage = new MemStorage();
