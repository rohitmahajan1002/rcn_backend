import { successResponse } from "../../utils/response.js";
import asyncHandler from "../../middlewares/async.middleware.js";
import { 
    createOrganizationService,
    organizationListService,
    organizationByIdService,
    deleteOrganizationService,
    updateOrganizationService,
    adminLoginService
} from "./admin.service.js";

/**
 * create organization
 */
export const createOrganization = asyncHandler(async(req, res) => {
    const organizationUser = await createOrganizationService(req.body);

    successResponse(
        res,
        {
            message: "Organization created successfully",
            data: organizationUser
        }
    );
});

/**
 * get organization list
 */
export const getOrganizationList = asyncHandler(async(req, res) => {
    const organizationList = await organizationListService();

    successResponse(res, {
        message: "Organizations fetched successfully",
        data: organizationList
    });
});

/**
 * get organization by id
 */
export const getOrganizationById = asyncHandler(async(req, res) => {
    const organization = await organizationByIdService(req.params.id);

    successResponse(res, {
        message: "Organization fetched successfully",
        data: organization
    });
});

/**
 * delete organization
 */
export const deleteOrganization = asyncHandler(async(req, res) => {
    const deleteOrganization = await deleteOrganizationService(req.params.id);

    successResponse(res, {
        message: "Organization Deleted successfully"
    });
});

/**
 * update organization
 */
export const updateOrganization = asyncHandler(async(req, res) => {
    const organization = await updateOrganizationService(req.params.id, req.body);

    successResponse(res, {
        message: "Organization Updated Successfully",
        data: organization
    });
});

/**
 * login admin
 */
export const adminLogin = asyncHandler(async(req, res) => {
    const {email, password} = req.body;
    const adminWithToken = await adminLoginService(email, password);

    successResponse(
        res,
        {
            message: "Admin logged in successfully",
            data: adminWithToken
        }
    );
});