import mongoose from "mongoose";

const BlacklistSchema = new mongoose.Schema(
    {
        token: {
            type: String,
            required: true,
            unique: true
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: false
        },
        expires_at: {
            type: Date,
            required: true
        },
        reason: {
            type: String,
            enum: ["logout", "admin_logout", "password_change", "security_breach"],
            default: "logout"
        }
    }, 
    {
        timestamps: true,
    }
);

BlacklistSchema.index({ expires_at: 1 }, { expireAfterSeconds: 0 });

const BlacklistModel = mongoose.model("Blacklist", BlacklistSchema);

export default BlacklistModel;