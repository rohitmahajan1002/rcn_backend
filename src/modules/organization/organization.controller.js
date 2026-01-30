import { successResponse } from "../../utils/response.js";
import asyncHandler from "../../middlewares/async.middleware.js";
import { 
    organizationLoginService, 
    organizationSignupService ,
    createOrganizationUserService,
    getOrganizationUsersService,
    getOrganizationUserByIDService,
    updateOrganizationUserService,
    deleteOrganizationUserService,
    createOrganizationBranchService,
    updateOrganizationBranchService,
    getOrganizationBranchByIDService,
    deleteOrganizationBranchService,
    getOrganizationBranchesService,
    createOrganizationDepartmentService,
    updateOrganizationDepartmentService,
    getOrganizationDepartmentByIDService,
    deleteOrganizationDepartmentService,
    getOrganizationDepartmentsService
} from "./organization.service.js";
import { getTokenizedUser } from "../../utils/helper.js";

/**
 * organization login
 */
export const organizationLogin = asyncHandler(async(req, res) => {
    const {email, password} = req.body;
    const organizationWithToken = await organizationLoginService(email, password);

    successResponse(
        res,
        {
            message: "Organization logged in successfully",
            data: organizationWithToken
        }
    );
});

/**
 * organization signup
 */
export const organizationSignup = asyncHandler(async(req, res) => {
    const organization = await organizationSignupService(req.body);

    successResponse(
        res,
        {
            message: "Organization signed up successfully",
            data: organization
        }
    );
});

/**
 * create organization user
 */
export const createOrganizationUser = asyncHandler(async(req, res) => {

    const token = await getTokenizedUser(req.headers.authorization);
    const organizationId = token.organization_id;

    const organizationUser = await createOrganizationUserService(req.body, organizationId);

    successResponse(
        res,
        {
            message: "Organization user created successfully",
            data: organizationUser
        }
    );
});


/**
 * show the list of the organization users
 */
export const getOrganizationUsers = asyncHandler(async(req, res) => {

    const token = await getTokenizedUser(req.headers.authorization);
    const organizationId = token.organization_id;

    const organizationUsers = await getOrganizationUsersService(organizationId);

    successResponse(
        res,
        {
            message: "Organization users fetched successfully",
            data: organizationUsers
        }
    );
});

/**
 * get organization user by id
 */
export const getOrganizationUserByID = asyncHandler(async(req, res) => {

    const userId = req.params.id;

    const organizationUsers = await getOrganizationUserByIDService(userId);

    successResponse(
        res,
        {
            message: "Organization user fetched successfully",
            data: organizationUsers
        }
    );
});

/**
 * update organization user by id
 */
export const updateOrganizationUserByID = asyncHandler(async(req, res) => {

    const userId = req.params.id;
    const payload = req.body;

    const updatedUser = await updateOrganizationUserService(userId, payload);

    successResponse(
        res,
        {
            message: "Organization user updated successfully",
            data: updatedUser
        }
    );
});

/**
 * delete organization user by id
 */
export const deleteOrganizationUserByID = asyncHandler(async(req, res) => {

    const userId = req.params.id;

    await deleteOrganizationUserService(userId);

    successResponse(
        res,
        {
            message: "Organization user deleted successfully",
        }
    );
});

/**
 * create organization branch
 */
export const createOrganizationBranch = asyncHandler(async(req, res) => {
    const token = await getTokenizedUser(req.headers.authorization);
    const organizationId = token.organization_id;

    const {name} = req.body;

    const branch = await createOrganizationBranchService(organizationId, name);

    successResponse(
        res,
        {
            message: "Organization branch created successfully",
            data: branch
        }
    );
});

/**
 * update organization branch
 */
export const updateOrganizationBranch = asyncHandler(async(req, res) => {
    const branchId = req.params.id;
    const payload = req.body;

    const updatedBranch = await updateOrganizationBranchService(branchId, payload);

    successResponse(
        res,
        {
            message: "Organization branch updated successfully",
            data: updatedBranch
        }
    );
});

/**
 * get organization branch by ID
 */
export const getOrganizationBranchByID = asyncHandler(async(req, res) => {
    const branchId = req.params.id;

    const branch = await getOrganizationBranchByIDService(branchId);

    successResponse(
        res,
        {
            message: "Organization branch fetched successfully",
            data: branch
        }
    );
});

/**
 * delete organization branch by ID
 */
export const deleteOrganizationBranchByID = asyncHandler(async(req, res) => {
    const branchId = req.params.id;

    await deleteOrganizationBranchService(branchId);

    successResponse(
        res,
        {
            message: "Organization branch deleted successfully",
        }
    );
});

/**
 * get organization branches
 */
export const getOrganizationBranches = asyncHandler(async(req, res) => {
    const token = await getTokenizedUser(req.headers.authorization);
    const organizationId = token.organization_id;

    const branches = await getOrganizationBranchesService(organizationId);

    successResponse(
        res,
        {
            message: "Organization branches fetched successfully",
            data: branches
        }
    );
});

/**
 * create organization department
 */
export const createOrganizationDepartment = asyncHandler(async(req, res) => {
    const token = await getTokenizedUser(req.headers.authorization);
    const organizationId = token.organization_id;

    const {branch_id, name} = req.body;

    const department = await createOrganizationDepartmentService(organizationId, branch_id, name);

    successResponse(
        res,
        {
            message: "Organization department created successfully",
            data: department
        }
    );
});

/**
 * update organization department
 */
export const updateOrganizationDepartment = asyncHandler(async(req, res) => {
    const departmentId = req.params.id;
    const payload = req.body;

    const updatedDepartment = await updateOrganizationDepartmentService(departmentId, payload);

    successResponse(
        res,
        {
            message: "Organization department updated successfully",
            data: updatedDepartment
        }
    );
});
    
/**
 * get organization department by ID
 */
export const getOrganizationDepartmentByID = asyncHandler(async(req, res) => {
    const departmentId = req.params.id; 
    const department = await getOrganizationDepartmentByIDService(departmentId);

    successResponse(
        res,
        {
            message: "Organization department fetched successfully",
            data: department
        }
    );
});

/**
 * delete organization department by ID
 */
export const deleteOrganizationDepartmentByID = asyncHandler(async(req, res) => {
    const departmentId = req.params.id;

    await deleteOrganizationDepartmentService(departmentId);

    successResponse(
        res,
        {
            message: "Organization department deleted successfully",
        }
    );
});

/**
 * get organization departments
 */
export const getOrganizationDepartments = asyncHandler(async(req, res) => {
    const token = await getTokenizedUser(req.headers.authorization);
    const organizationId = token.organization_id;
    const {branch_id} = req.query;

    const departments = await getOrganizationDepartmentsService(organizationId, branch_id);

    successResponse(
        res,
        {
            message: "Organization departments fetched successfully",
            data: departments
        }
    );
}); 