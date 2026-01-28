import { Router } from "express";
import authenticate from "../../middlewares/auth.middleware.js";
import loadPermission from "../../middlewares/loadPermissions.middleware.js";
import authorizePermissions from "../../middlewares/permission.middleware.js";
import validate from "../../middlewares/validate.middleware.js";

import { 
    createUserSchema,
    updateUserSchema,
    userIdParamSchema 
} from "./user.validate.js";
import { 
    getAllUsers, 
    getUserByID,
    createUser,
    updateUser,
    deleteUser
} from "./user.controller.js";

const router = Router();
router.use(authenticate);
router.use(loadPermission);

/**
 * USER ROUTES
 * BASE PATH: /api/users
 */

/**
 * for getting all users data
 */
router.get('/', authorizePermissions("user.read"), getAllUsers);

/**
 * for getting single user using the id
 */
router.get('/:id', validate(userIdParamSchema), getUserByID);

/**
 * for creating the user
 */
router.post('/', authorizePermissions("user.create"), validate(createUserSchema), createUser);

/**
 * for updating the user
 */
router.put('/:id', authorizePermissions("user.update"), validate(updateUserSchema), updateUser);

/**
 * for deleting the user
 */
router.delete('/:id', authorizePermissions("user.delete"), validate(userIdParamSchema), deleteUser);

export default router;