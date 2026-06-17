import express from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { getUsers, getUserById } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", verifyJWT, getUsers);
router.get("/:userId", verifyJWT, getUserById);

export default router;
