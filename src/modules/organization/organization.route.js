import { Router } from "express";
import authenticate from "../../middlewares/auth.middleware.js";
import loadPermission from "../../middlewares/loadPermissions.middleware.js";
import authorizePermissions from "../../middlewares/permission.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import { 
    organizationLogin, 
    organizationSignup,
    createOrganizationUser
} from "./organization.controller.js";
import { 
    createOrganizationSchema, 
    organizationLoginSchema 
} from "./organization.validate.js";
import { 
    createUserSchema 
} from "../user/user.validate.js";

const router = new Router();

/**
 * Public Routes
 */
router.post('/login', validate(organizationLoginSchema), organizationLogin);
router.post('/signup', validate(createOrganizationSchema), organizationSignup);

router.use(authenticate);
router.use(loadPermission);

/**
 * Protected Routes
 */
router.post('/user', authorizePermissions("org.user.create"), validate(createUserSchema), createOrganizationUser);

export default router;