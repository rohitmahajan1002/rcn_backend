/**
 * User Service to get the users related data
 */

import User from "./user.model.js";
import bcrypt from "bcrypt";

const DEFAULT_PASSWORD = "password123";
const DEFAULT_ROLE_ID = 3;
const SALT_ROUNDS = 10;
const DEAFULT_STATUS = 1;

/**
 * 
 * @param {*} payload 
 * @returns created user
 */
export const createUserService = async(payload, organizationId = null) => {

    const plainPassword = payload.password || DEFAULT_PASSWORD;

    const hashedPassword = await bcrypt.hash(plainPassword, SALT_ROUNDS);

    const userData = {
        ...payload,
        password: hashedPassword,
        role_id: DEFAULT_ROLE_ID,
        status: DEAFULT_STATUS
    }

    if (organizationId) {
        userData.organization_id = organizationId;
    }

    const user = await User.create(userData);
    const userObj = user.toObject();
    delete userObj.password;
    return {
        user: userObj
    };
}

/**
 * 
 * @returns list of users
 */
export const getAllUsersService = async() => {
    return User.find({
        status: {
            $ne: 3
        }
    });
}

/**
 * 
 * @param {*} id 
 * @returns user belong to the id
 */
export const getUserByIDService = async(id) => {
    return User.findOne({
        _id: id,
        status: {
            $ne: 3
        }
    });
}

/**
 * 
 * @param {*} id 
 * @param {*} payload 
 * @returns updated user
 */
export const updateUserService = async(id, payload) => {
    return User.findOneAndUpdate(
        {
            _id: id,
            status: {
                $ne: 3
            }
        },
        payload,
        {
            new: true
        }
    );
}

/**
 * 
 * @param {*} id 
 * @returns soft delete the user
 */
export const softDeleteUserService = async(id) => {
    return User.findByIdAndUpdate(
        id,
        {
            status: 3
        },
        {
            new: true
        }
    );
}

/**
 * 
 * @param {*} id 
 * @returns hard delete the user
 */
export const hardDeleteUserService = async(id) => {
    return User.findByIdAndDelete(id);
}