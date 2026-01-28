import { successResponse } from "../../utils/response.js";
import asyncHandler from "../../middlewares/async.middleware.js";
import { 
    organizationLoginService, 
    organizationSignupService ,
    createOrganizationUserService
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