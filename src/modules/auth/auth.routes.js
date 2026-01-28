import { Router } from "express";
import { loginUser, refreshToken } from "./auth.controller.js";
import validate from "../../middlewares/validate.middleware.js";
import { loginSchema, refreshTokenSchema } from "./auth.validate.js";

/**
 * Login User
 */

const router = Router();

router.post('/login', validate(loginSchema), loginUser);
router.post('/refresh', validate(refreshTokenSchema), refreshToken);

export default router; 