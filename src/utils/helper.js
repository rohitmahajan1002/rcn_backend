import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export const getTokenizedUser = (bearerToken) => {
    if (!bearerToken || !bearerToken.startsWith("Bearer ")) {   
        return null;
    }
    const token = bearerToken.split(" ")[1];
    const decoded = jwt.verify(
        token,
        env.jwtAccessSecret
    );
    return decoded;
}