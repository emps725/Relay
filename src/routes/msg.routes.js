import { Router } from "express";
import { sendMessage } from "../controllers/sendMessage.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/send", verifyJWT, sendMessage);

export default router;
