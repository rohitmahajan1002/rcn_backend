import jwt from 'jsonwebtoken';
import Organization from './organization.model.js';
import bcrypt from 'bcrypt';
import { env } from '../../config/env.js';
import User from '../user/user.model.js';
import { createOrganizationService } from '../admin/admin.service.js';
import Branch from './branches.model.js';
import Department from './department.model.js';
import { 
    createUserService,
    updateUserService 
} from '../user/user.service.js';
import { getTokenizedUser } from '../../utils/helper.js';

const ORGANIZATION_ROLE_ID = 4;
const USER_ROLE_ID = 3;

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
        const error = new Error('Invalid Email or Password');
        error.statusCode = 400;
        throw error;
    }

    if(organization.status !== 1) {
        const error = new Error('Organization is not active');
        error.statusCode = 400;
        throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, organization.password);
    if (!isPasswordValid) {
        const error = new Error('Invalid Email or Password');
        error.statusCode = 400;
        throw error;
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
    const createdUser = await createUserService(payload, organizationId);
    const userData = await User.findById(createdUser._id).populate('organization_id');

    const userPayload = {
        user: userData
    }

    return userPayload;
};

/**
 * show the list of organization users
 */
export const getOrganizationUsersService = async(organizationId) => {
    return User.find({
        organization_id: organizationId,
        role_id: USER_ROLE_ID,
    }).populate('organization_id');
}

/**
 * get organization user by ID
 */
export const getOrganizationUserByIDService = async(userId) => {
    return User.findById(userId).populate('organization_id');
}

/**
 * update organization user by ID
 */
export const updateOrganizationUserService = async(userId, payload) => {
    const updatedUser = await updateUserService(userId, payload);

    const userData = await User.findById(updatedUser._id).populate('organization_id');

    const userPayload = {
        user: userData
    }

    return userPayload;
}

/**
 * delete organization user by ID
 */
export const deleteOrganizationUserService = async(userId) => {
    return User.findByIdAndDelete(userId);
}

/**
 * create organization branch
 */
export const createOrganizationBranchService = async(organizationId, branchName) => {

    if (!organizationId) {
        const error = new Error('Organization ID is required to create branch');
        error.statusCode = 400;
        throw error;
    }

    const checkBranch = await Branch.findOne({
        organization_id: organizationId,
        name: branchName
    });

    if (checkBranch) {
        const error = new Error('Branch with the same name already exists in this organization');
        error.statusCode = 400;
        throw error;
    }

    const branch = await Branch.create({
        organization_id: organizationId,
        name: branchName
    });

    return branch;
}

/**
 * get list of the branches of an organization
 */
export const getOrganizationBranchesService = async(organizationId) => {
    return Branch.find({
        organization_id: organizationId
    });
}

/**
 * get organization branch by ID
 */
export const getOrganizationBranchByIDService = async(branchId) => {
    return Branch.findById(branchId);
}

/**
 * update organization branch by ID
 */
export const updateOrganizationBranchService = async(branchId, payload) => {
    return Branch.findByIdAndUpdate(
        branchId,
        payload,
        {
            new: true
        }
    );
}

/**
 * delete organization branch by ID
 */
export const deleteOrganizationBranchService = async(branchId) => {
    return Branch.findByIdAndDelete(branchId);
}

/**
 * create organization department
 */
export const createOrganizationDepartmentService = async(organizationId, branchId, departmentName) => {

    if (!organizationId) {
        const error = new Error('Organization ID is required to create department');
        error.statusCode = 400;
        throw error;
    }

    if (!branchId) {
        const error = new Error('Branch ID is required to create department');
        error.statusCode = 400;
        throw error;
    }

    const checkDepartment = await Department.findOne({
        organization_id: organizationId,
        branch_id: branchId,
        name: departmentName
    });

    if (checkDepartment) {
        const error = new Error('Department with the same name already exists in this branch of the organization');
        error.statusCode = 400;
        throw error;
    }

    const department = await Department.create({
        organization_id: organizationId,
        branch_id: branchId,
        name: departmentName
    });

    return department;
}

/**
 * get list of the departments of an organization branch
 */
export const getOrganizationDepartmentsService = async(organizationId, branchId) => {
    return Department.find({
        organization_id: organizationId,
        branch_id: branchId
    });
}

/**
 * get organization department by ID
 */
export const getOrganizationDepartmentByIDService = async(departmentId) => {
    return Department.findById(departmentId);
}

/**
 * update organization department by ID
 */
export const updateOrganizationDepartmentService = async(departmentId, payload) => {
    return Department.findByIdAndUpdate(
        departmentId,
        payload,
        {
            new: true
        }
    );
}

/**
 * delete organization department by ID
 */
export const deleteOrganizationDepartmentService = async(departmentId) => {
    return Department.findByIdAndDelete(departmentId);
}