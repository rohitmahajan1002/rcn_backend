import mongoose from "mongoose";

const rolePermissionSchema = new mongoose.Schema(
    {
        role_id: {
            type: Number,
            required: true,
            index: true,
        },
        permission_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Permission",
            required: true,
        },
    },
    {
        timestamps: true
    }
);


const RolePermission = mongoose.model('RolePermission', rolePermissionSchema);
export default RolePermission;