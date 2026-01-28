import { successResponse } from "../../utils/response.js";
import asyncHandler from "../../middlewares/async.middleware.js";
import { 
    createOrganizationService,
    organizationListService,
    organizationByIdService,
    deleteOrganizationService,
    updateOrganizationService
} from "./admin.service.js";
import Organization from "../organization/organization.model.js";

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

export const getOrganizationList = asyncHandler(async(req, res) => {
    const organizationList = await organizationListService();

    successResponse(res, {
        message: "Organizations fetched successfully",
        data: organizationList
    });
});

export const getOrganizationById = asyncHandler(async(req, res) => {
    const organization = await organizationByIdService(req.params.id);

    successResponse(res, {
        message: "Organization fetched successfully",
        data: organization
    });
});

export const deleteOrganization = asyncHandler(async(req, res) => {
    const deleteOrganization = await deleteOrganizationService(req.params.id);

    successResponse(res, {
        message: "Organization Deleted successfully"
    });
});

export const updateOrganization = asyncHandler(async(req, res) => {
    const organization = await updateOrganizationService(req.params.id, req.body);

    successResponse(res, {
        message: "Organization Updated Successfully",
        data: organization
    });
});