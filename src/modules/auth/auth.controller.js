import asyncHandler from "../../middlewares/async.middleware.js";
import { successResponse } from "../../utils/response.js";
import { loginService, refreshTokenService } from "./auth.service.js";


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