import User  from "../modules/user/user.model.js";
import bcrypt from "bcrypt";

const PASSWORD = 'password123';
const SALT_AMOUNT = 10;

const adminData = {
    email: "superadmin@rnc.com",
    first_name: "Super",
    last_name: "Admin",
    role_id: 1,
    status: 1
};

const seedAdmin = async () => {
    const hashedPassword = await bcrypt.hash(PASSWORD, SALT_AMOUNT);

    const query = await User.findOneAndUpdate(
        {
            email: adminData.email
        },
        {
            ...adminData,
            password: hashedPassword
        },
        {
            new: true,
            upsert: true
        }
    );
}

export default seedAdmin;