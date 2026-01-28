import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
    {
         id: {
            type: Number,
            required: true,
            unique: true,
            index: true,
        },
        name: {
            type: String,
            required: true,
        },
    }, 
    {
        timestamps: true
    }
);

const Role = mongoose.model("Role", roleSchema);
export default Role;