import express from "express";
import userRoutes from "./userRoutes.js";
import campaignRoutes from "./campaignRoutes.js";
import streamRoutes from "./streamRoutes.js";
import analyticsRoutes from "./analyticsRoutes.js";
import contentRoutes from "./contentRoutes.js";
import distributionPoolRoutes from "./distributionPoolRoutes.js";
import brandRoutes from "./brandRoutes.js";
import influencerRoutes from "./influencerRoute.js";

const router = express.Router();

// Mount all routes
router.use("/users", userRoutes);
router.use("/campaigns", campaignRoutes);
router.use("/streams", streamRoutes);
router.use("/analytics", analyticsRoutes);
router.use("/content", contentRoutes);
router.use("/distribution-pools", distributionPoolRoutes);
router.use("/brands", brandRoutes);
router.use("/influencer", influencerRoutes);

export default router;
