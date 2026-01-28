export const userResponse = (user) => {
    if(!user) return null;

    return {
        id: user._id,
        email: user.email,
        status: user.status,
        first_name: user.first_name,
        last_name: user.last_name,
        fax_number: user.fax_number,
        role_id: user.role_id
    }
}