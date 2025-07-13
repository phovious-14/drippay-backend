import express from "express";
import * as UserController from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create new user account
router.post("/create", UserController.createUser);

// User authentication
router.post("/login", UserController.loginUser);

// Get user profile
router.get("/:userId", authMiddleware, UserController.getUserById);

// Get user profile by privyId
router.get("/privy/:privyId", authMiddleware, UserController.getUserByPrivyId);

// Get all users
router.get("/", UserController.getUsers);

// Update user profile
router.put("/:userId", authMiddleware, UserController.updateUser);

// Delete user account
router.delete("/:userId", authMiddleware, UserController.deleteUser);

// Update user role
router.put("/:userPrivyId/role", authMiddleware, UserController.updateUserRole);

export default router;
