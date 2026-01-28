import { env } from "../../config/env.js";
import User from "../user/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"; 
import { userResponse } from "../user/user.response.js";

const USER_ROLE = 3; 

/**
 * service to login the user
 */
export const loginService = async({email,password}) => {
    const user = await User.findOne({
        email: email,
        role_id: USER_ROLE
    }).select("+password");

    if(!user) {
        const error = new Error('Invalid Email or Password');
        error.statusCode = 400;
        throw(error);
    }

    if(user.status != 1) {
        const error = new Error("Account is not active. Please try again later");
        error.statusCode = 400;
        throw(error);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    
    if(!isMatch) {
        const error = new Error("Invalid Email or Password");
        error.statusCode = 400;
        throw(error);
    }

    const payload = {
        user_id: user._id,
        role_id: user.role_id,
        status: user.status
    }

    const accessToken = jwt.sign(
        payload,
        env.jwtAccessSecret,
        {
            expiresIn: env.jwtAccessExpiresIn
        }
    );

    const refreshToken = jwt.sign(
        payload,
        env.jwtRefreshSecret,
        {
            expiresIn: env.jwtRefreshExpiresIn
        }
    );

    const userObj = user.toObject();
    delete userObj.password;

    return {
        refreshToken,
        accessToken,
        user: userObj
    }
};

/**
 * to generate a access token using refresh token
 */
export const refreshTokenService = async({refresh_token}) => {
    console.log(refresh_token);
    if(!refresh_token) {
        const error = new Error("Refresh Token is required");
        error.statusCode = 400;
        throw(error);
    }

    const decoded = jwt.verify(
        refresh_token,
        env.jwtRefreshSecret
    );

    const user = await User.findById(decoded.user_id);

    if(!user || user.status !== 1) {
        const error = new Error("Unauthorized");
        error.statusCode = 401;
        throw error;
    }

    const payload = {
        user_id: user._id,
        role_id: user.role_id,
        status: user.status
    }

    const newAccessToken = jwt.sign(
        payload,
        env.jwtAccessSecret,
        {
            expiresIn: env.jwtAccessExpiresIn
        }
    );    

    return {
        access_token: newAccessToken
    };
}

/**
 * get user profile service
 */
export const getUserProfileService = async(authorizeToken) => {
    const token = authorizeToken.split(" ")[1];

    const decoded = jwt.verify(
        token,
        env.jwtAccessSecret
    );

    const user = await User.findById(decoded.id).populate('organization_id');

    return user;
}