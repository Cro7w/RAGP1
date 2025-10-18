import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import bcrypt from "bcrypt";
import { insertUserSchema, updateUserProfileSchema } from "../shared/schema";


export async function registerRoutes(app: Express): Promise<Server> {
  // Signup route
  app.post("/api/signup", async (req, res) => {
    try {
      const result = insertUserSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ message: "Invalid input" });
      }

      const { username, password } = result.data;

      // Check if user already exists
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const user = await storage.createUser({
        username,
        password: hashedPassword
      });

      // Set session
      req.session.userId = user.id;

      res.json({ 
        message: "User created successfully",
        user: {
          id: user.id,
          username: user.username,
          avatar: user.avatar,
          displayName: user.displayName
        }
      });
    } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Login route
  app.post("/api/login", async (req, res) => {
    try {
      const result = insertUserSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ message: "Invalid input" });
      }

      const { username, password } = result.data;

      // Find user
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ message: "Invalid username or password" });
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid username or password" });
      }

      // Set session
      req.session.userId = user.id;

      res.json({ 
        message: "Login successful",
        user: {
          id: user.id,
          username: user.username,
          avatar: user.avatar,
          displayName: user.displayName
        }
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Save avatar route
  app.post("/api/save-avatar", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const result = updateUserProfileSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ message: "Invalid input" });
      }

      const { avatar, displayName } = result.data;

      // Update user profile
      const updatedUser = await storage.updateUserProfile(req.session.userId, {
        avatar,
        displayName
      });

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ 
        message: "Avatar saved successfully",
        user: {
          id: updatedUser.id,
          username: updatedUser.username,
          avatar: updatedUser.avatar,
          displayName: updatedUser.displayName
        }
      });
    } catch (error) {
      console.error("Save avatar error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get user route
  app.get("/api/get-user", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const user = await storage.getUser(req.session.userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({
        id: user.id,
        username: user.username,
        avatar: user.avatar,
        displayName: user.displayName
      });
    } catch (error) {
      console.error("Get user error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Logout route
  app.post("/api/logout", async (req, res) => {
    try {
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ message: "Logout failed" });
        }
        res.json({ message: "Logout successful" });
      });
    } catch (error) {
      console.error("Logout error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
