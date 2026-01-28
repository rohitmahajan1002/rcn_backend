import mongoose from "mongoose";
import { required } from "zod/mini";

const organizationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            minlength: [2, "Last name must be at least 2 characters"],
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: [true, "Organization email already exists"],
            lowercase: true,
            trim: true,
            match: [
                /^\S+@\S+\.\S+$/,
                "Please use a valid email address",
            ],
            index: true,
        },

        dial_code: {
            type: String,
            trim: true,
            required: true,
            maxlength: [5, "Dial code too long"],
        },

        phone_number: {
            type: String,
            trim: true,
            required: true,
            maxlength: [20, "Phone number too long"],
        },

        ein_number: {
            type: String,
            trim: true,
        },

        street: {
            type: String,
            trim: true,
            required: true,
        },

        suite: {
            type: String,
            trim: true,
        },

        latitude: {
            type: String,
            trim: true,
            required: true,
        },

        longitude: {
            type: String,
            trim: true,
            required: true,
        },

        city: {
            type: String,
            trim: true,
            required: true,
        },

        state: {
            type: String,
            trim: true,
            required: true
        },

        country: {
            type: String,
            trim: true,
            required: true,
        },

        zip_code: {
            type: String,
            trim: true,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Organization = new mongoose.model('Organization', organizationSchema);
export default Organization;