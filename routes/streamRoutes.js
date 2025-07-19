import express from "express";
import { createStream, updateStreamStatus } from "../controllers/streamController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createStream);
router.post("/update-status", authMiddleware, updateStreamStatus);

export default router;