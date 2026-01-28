import { successResponse } from "../../utils/response.js";
import asyncHandler from "../../middlewares/async.middleware.js";
import {  
    createUserService,
    getAllUsersService,
    getUserByIDService,
    updateUserService,
    softDeleteUserService,
    hardDeleteUserService
} from "./user.service.js";

/**
 * get all users
 */
export const getAllUsers = asyncHandler(async (req, res) => {

    const users = await getAllUsersService();

    successResponse(res, {
        message: 'Users Data Fetched Successfully',
        data: users
    });
});

/**
 * get user using id
 */
export const getUserByID = asyncHandler(async (req, res) => {
    const {id} = req.params;

    const user = await getUserByIDService(id);

    successResponse(res, {
        message: `User with id ${id} fetched successfully`,
        data: user,
    });
});

/**
 * create new user
 */
export const createUser = asyncHandler(async (req, res) => {

    const user = await createUserService(req.body);

    successResponse(res, {
        message: 'User created Successfully',
        data:user
    });

});

/**
 * update user
 */
export const updateUser = asyncHandler(async (req, res) => {
    const user = await createUserService(req.params.id, req.body);

    successResponse(res, {
        message: "User updated successfully",
        data: user
    });
});

/**
 * delete the user
 */
export const deleteUser = asyncHandler(async (req, res) => {
    const user = await hardDeleteUserService(req.params.id);

    successResponse(res, {
        message: "User deleted successfully"
    });
});