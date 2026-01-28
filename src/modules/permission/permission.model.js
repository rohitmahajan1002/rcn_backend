import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const Permission = mongoose.model("Permission", permissionSchema);
export default Permission;