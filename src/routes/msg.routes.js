import { Router } from "express";
import { sendMessage } from "../controllers/sendMessage.controller.js";
import { getConvo } from "../controllers/getConversation.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/send", verifyJWT, sendMessage);
router.get("/conversation/:userId", verifyJWT, getConvo);
export default router;
