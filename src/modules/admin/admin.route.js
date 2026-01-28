import { Router } from "express";
import authenticate from "../../middlewares/auth.middleware.js";
import loadPermission from "../../middlewares/loadPermissions.middleware.js";
import authorizePermissions from "../../middlewares/permission.middleware.js";
import validate from "../../middlewares/validate.middleware.js";

import {
    createOrganizationSchema,
    organizationIdSchema,
    updateOrganizationSchema
} from "../organization/organization.validate.js";

import { adminLoginSchema } from "./admin.validate.js";

import { 
    createOrganization,
    getOrganizationList,
    getOrganizationById,
    deleteOrganization,
    updateOrganization,
    adminLogin
} from "./admin.controller.js";

const router = new Router();

/**
 * Public Routes
 */
router.post('/login', validate(adminLoginSchema), adminLogin);

/**
 * Protected Routes
 */
router.use(authenticate);
router.use(loadPermission);

router.post('/organization', authorizePermissions("org.create"), validate(createOrganizationSchema) ,createOrganization);
router.get('/organization', authorizePermissions("org.read"), getOrganizationList);
router.get('/organization/:id', authorizePermissions("org.read"), validate(organizationIdSchema), getOrganizationById);
router.delete('/organization/:id', authorizePermissions("org.delete"), validate(organizationIdSchema), deleteOrganization);
router.put('/organization/:id', authorizePermissions("org.update"), validate(updateOrganizationSchema), updateOrganization);


export default router;