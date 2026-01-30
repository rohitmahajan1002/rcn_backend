import { Router } from "express";
import authenticate from "../../middlewares/auth.middleware.js";
import loadPermission from "../../middlewares/loadPermissions.middleware.js";
import authorizePermissions from "../../middlewares/permission.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import { 
    organizationLogin, 
    organizationSignup,
    createOrganizationUser,
    updateOrganizationUserByID,
    deleteOrganizationUserByID,
    getOrganizationUserByID,
    getOrganizationUsers,
    getOrganizationDepartments,
    getOrganizationDepartmentByID,
    createOrganizationDepartment,
    updateOrganizationDepartment,
    deleteOrganizationDepartmentByID,
    getOrganizationBranches,
    getOrganizationBranchByID,
    createOrganizationBranch,
    updateOrganizationBranch,
    deleteOrganizationBranchByID
} from "./organization.controller.js";
import { 
    createOrganizationSchema, 
    organizationLoginSchema,
    createBranchSchema,
    updateBranchSchema,
    getBranchByIDSchema,
    createDepartmentSchema,
    updateDepartmentSchema,
    getDepartmentByIDSchema
} from "./organization.validate.js";
import { 
    createUserSchema,
    updateUserSchema,
    userIdParamSchema
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
router.put('/user/:id', authorizePermissions("org.user.update"), validate(updateUserSchema), updateOrganizationUserByID);
router.delete('/user/:id', authorizePermissions("org.user.delete"), validate(userIdParamSchema), deleteOrganizationUserByID);
router.get('/user/:id', authorizePermissions("org.user.read"), validate(userIdParamSchema), getOrganizationUserByID);
router.get('/user', authorizePermissions("org.user.read"), getOrganizationUsers);
router.get('/departments', authorizePermissions("org.department.read"), getOrganizationDepartments);
router.get('/department/:id', authorizePermissions("org.department.read"), validate(getDepartmentByIDSchema), getOrganizationDepartmentByID);
router.get('/branch', authorizePermissions("org.branch.read"), getOrganizationBranches);
router.get('/branch/:id', authorizePermissions("org.branch.read"), validate(getBranchByIDSchema), getOrganizationBranchByID);
router.post('/branch', authorizePermissions("org.branch.create"), validate(createBranchSchema), createOrganizationBranch);
router.put('/branch/:id', authorizePermissions("org.branch.update"), validate(updateBranchSchema), updateOrganizationBranch);
router.delete('/branch/:id', authorizePermissions("org.branch.delete"), validate(getBranchByIDSchema), deleteOrganizationBranchByID);
router.post('/department', authorizePermissions("org.department.create"), validate(createDepartmentSchema), createOrganizationDepartment);
router.put('/department/:id', authorizePermissions("org.department.update"), validate(updateDepartmentSchema), updateOrganizationDepartment);
router.delete('/department/:id', authorizePermissions("org.department.delete"), validate(getDepartmentByIDSchema), deleteOrganizationDepartmentByID);


export default router;