import Organization from "../organization/organization.model.js";
import User from "../user/user.model.js";
import bcrypt from "bcrypt";

const ORGANIZATION_PASSWORD = 'password123';
const SALT_AMOUNT = 10;
const ORGANIZATION_ROLE = 4;
const DEFAULT_STATUS = 1;


export const createOrganizationService = async(payload) => {
    const companyPayload = {
        name: payload.name,
        email:payload.email,
        dial_code: payload.dial_code,
        phone_number: payload.phone_number,
        ein_number: payload.ein_number,
        street: payload.street,
        suite: payload.suite,
        latitude: payload.latitude,
        longitude: payload.longitude,
        city: payload.city,
        state: payload.state,
        country: payload.country,
        zip_code: payload.zip_code
    };

    const organization = await Organization.create(companyPayload);

    const hashedPassword = await bcrypt.hash(ORGANIZATION_PASSWORD, SALT_AMOUNT);

    const userPayload = {
        first_name: payload.user_first_name,
        last_name: payload.user_last_name,
        email: payload.user_email,
        dial_code: payload.user_dial_code,
        phone_number: payload.phone_number,
        fax_number: payload.fax_number,
        organization_id: organization._id,
        password: hashedPassword,
        role_id: ORGANIZATION_ROLE,
        status: DEFAULT_STATUS
    }

    const user = await User.create(userPayload);

    return {
        user: {
            ...user.toObject(),
            organization_id: organization,
        },
    };
}

export const organizationListService = async() => {
    const organizations = await User.find(
        {
            role_id: ORGANIZATION_ROLE
        }
    ).populate('organization_id');

    return organizations;
}

export const organizationByIdService = async(id) => {
    const organization = await User.findOne(
        {
            role_id: ORGANIZATION_ROLE,
            _id: id
        }
    ).populate('organization_id');

    if(!organization) {
        throw new Error("Organization not found");
    }

    return organization;
}

export const deleteOrganizationService = async(id) => {
    const user = await User.findById(id);

    if (!user) {
        throw new Error("User not found");
    }

    if (user.organization_id) {
        await Organization.findByIdAndDelete(user.organization_id);
    }

    await User.findByIdAndDelete(id);

    return { success: true };
}

export const updateOrganizationService = async(id, payload) => {
    const user = await User.findById(id);

    if (!user) {
        throw new Error("User not found");
    }
    
    const organization = await Organization.findByIdAndUpdate(
        user.organization_id,
        {
        name: payload.name,
        email: payload.email,
        dial_code: payload.dial_code,
        phone_number: payload.phone_number,
        ein_number: payload.ein_number,
        street: payload.street,
        suite: payload.suite,
        latitude: payload.latitude,
        longitude: payload.longitude,
        city: payload.city,
        state: payload.state,
        country: payload.country,
        zip_code: payload.zip_code,
        },
        { new: true }
    );

    const updatedUser = await User.findByIdAndUpdate(
        id,
        {
        first_name: payload.user_first_name,
        last_name: payload.user_last_name,
        email: payload.user_email,
        dial_code: payload.user_dial_code,
        phone_number: payload.phone_number,
        fax_number: payload.fax_number,
        status: payload.status ?? DEFAULT_STATUS,
        },
        { new: true }
    );

    return {
        user: {
        ...updatedUser.toObject(),
        organization_id: organization,
        },
    };
}