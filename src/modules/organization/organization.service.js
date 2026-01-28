import jwt from 'jsonwebtoken';
import Organization from './organization.model.js';
import bcrypt from 'bcrypt';
import { env } from '../../config/env.js';
import User from '../user/user.model.js';
import { createOrganizationService } from '../admin/admin.service.js';
import { createUserService } from '../user/user.service.js';

const ORGANIZATION_ROLE_ID = 4;

/**
 * service to login organization
 */
export const organizationLoginService = async (email, password) => {
    const organization = await User.findOne(
        { 
            email: email, 
            role_id: ORGANIZATION_ROLE_ID
        }
    ).select('+password').populate('organization_id');

    if (!organization) {
        throw new Error('Organization not found');
    }

    if(organization.status !== 1) {
        throw new Error('Organization is not active');
    }

    const isPasswordValid = await bcrypt.compare(password, organization.password);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }

    const payload = { 
        id: organization._id, 
        email: organization.email, 
        role_id: organization.role_id,
        organization_id: organization.organization_id._id,
        status: organization.status 
    };

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

    const organizationData = organization.toObject();
    delete organizationData.password;

    return {
        accessToken,
        refreshToken,
        organization: organizationData
    }
};

/**
 * service to signup organization
 */
export const organizationSignupService = async(payload) => {
    const organization = await createOrganizationService(payload);

    const tokenPayload = { 
        id: organization.organization._id, 
        email: organization.organization.email, 
        role_id: organization.organization.role_id, 
        status: organization.organization.status 
    };

    const accessToken = jwt.sign(
        tokenPayload,
        env.jwtAccessSecret,
        { 
            expiresIn: env.jwtAccessExpiresIn 
        }
    );

    const refreshToken = jwt.sign(
        tokenPayload,
        env.jwtRefreshSecret,
        { 
            expiresIn: env.jwtRefreshExpiresIn 
        }
    );

    return {
        accessToken,
        refreshToken,
        organization: organization.organization
    };
}

/**
 * create organization user service
 */
export const createOrganizationUserService = async(payload, organizationId) => {
    return createUserService(payload, organizationId);
};