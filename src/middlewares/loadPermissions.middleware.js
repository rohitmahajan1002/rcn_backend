import RolePermission from "../modules/rolePermission/rolePermission.model.js";
import Permission from "../modules/permission/permission.model.js";
import Role from "../modules/role/role.model.js";

const loadPermission = async(req, res, next) => {

    const roleId = req.user.role_id;

    const rolePermissions = await RolePermission.find(
        {
            'role_id': roleId
        }
    ).populate('permission_id');

    req.user.permissions = rolePermissions.map(
        (rp) => rp.permission_id.key 
    );

    next();
}

export default loadPermission;