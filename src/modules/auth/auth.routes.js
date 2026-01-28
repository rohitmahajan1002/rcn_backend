import { Router } from "express";
import { 
    loginUser, 
    refreshToken, 
    logoutUser,
    getUserProfile
} from "./auth.controller.js";
import validate from "../../middlewares/validate.middleware.js";
import { 
    loginSchema, 
    refreshTokenSchema 
} from "./auth.validate.js";
import authenticate from "../../middlewares/auth.middleware.js";
import loadPermission from "../../middlewares/loadPermissions.middleware.js";

/**
 * Login User
 */

const router = Router();

/**
 * Public Routes
 */
router.post('/login', validate(loginSchema), loginUser);
router.post('/refresh', validate(refreshTokenSchema), refreshToken);

console.log("Auth routes loaded");

/**
 * Protected Routes
 */
router.use(authenticate);
router.use(loadPermission);
router.post('/logout', logoutUser);
router.get('/profile', getUserProfile);

export default router; 