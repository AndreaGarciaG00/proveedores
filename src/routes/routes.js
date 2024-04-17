import express from "express";
import * as providersController from "../controllers/providers.controller.js";

const router = express.Router();

router.post("/api/providers", providersController.createProvider);
router.get("/about", providersController.getProviders);

export default router;
