import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minlength: [2, "First name must be at least 2 characters"],
    },

    last_name: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      minlength: [2, "Last name must be at least 2 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
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
      maxlength: [5, "Dial code too long"],
    },

    phone_number: {
      type: String,
      trim: true,
      maxlength: [20, "Phone number too long"],
    },

    fax_number: {
      type: String,
      trim: true,
      maxlength: [20, "Fax number too long"],
    },

    role_id: {
      type: Number,
      required: [true, "Role ID is required"],
      index: true,
    },

    password: {
      type: String,
      required: true,
      minlength: [8, "Password must be at least 8 characters"],
      select: false,
    },

    organization_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: false,
    },

    status: {
      type: Number,
      enum: {
        values: [0, 1, 2, 3],
        message: "Invalid status value",
      },
      default: 0,
      index: true,
    },

    notes: {
      type: String,
      trim: true,
      maxlength: [500, "Notes too long"],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
