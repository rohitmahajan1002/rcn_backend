import mongoose from "mongoose";

const DepartmentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        organization_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organization",
            required: true
        },
        branch_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Branch",
            required: true
        },
    },
    {
        timestamps: true
    }
);

const Department = mongoose.model("Department", DepartmentSchema);

export default Department;