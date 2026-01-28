import asyncHandler from "../../middlewares/async.middleware.js";
import { successResponse } from "../../utils/response.js";
import { 
    loginService, 
    refreshTokenService,
    getUserProfileService 
} from "./auth.service.js";


/**
 * login the organization or user
 */
export const loginUser = asyncHandler(async(req, res) => {
    const userwithToken = await loginService(req.body);

    successResponse(
        res,
        {
            message: "User Logged in successfully",
            data: userwithToken
        }
    );
});


/**
 * Generate new access token using the refresh token
 */
export const refreshToken = asyncHandler(async(req, res) => {
    const refreshToken = await refreshTokenService(req.body);

    successResponse(
        res,{
            message: "Token Generated Successfully",
            data: refreshToken
        }
    );
});


/**
 * logout all the users
 */
export const logoutUser = asyncHandler(async(req, res) => {
    successResponse(
        res,
        {
            message: "User logged out successfully"
        }
    );
});

/**
 * get user profile
 */
export const getUserProfile = asyncHandler(async(req, res) => {
    const profileDetail = await getUserProfileService(req.headers.authorization);

    successResponse(
        res,
        {
            message: "User profile fetched successfully",
            data: profileDetail
        }
    );

});