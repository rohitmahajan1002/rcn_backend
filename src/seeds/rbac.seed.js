import Permission from "../modules/permission/permission.model.js";
import Role from "../modules/role/role.model.js";
import RolePermission from "../modules/rolePermission/rolePermission.model.js";

const PERMISSIONS = [
  { key: "user.create", description: "Create users" },
  { key: "user.read", description: "Read users" },
  { key: "user.update", description: "Update users" },
  { key: "user.delete", description: "Delete users" },

  { key: "org.create", description: "Create organization" },
  { key: "org.read", description: "Read organization" },
  { key: "org.update", description: "Update organization" },
  { key: "org.delete", description: "Delete organization" },

  { key: "subadmin.create", description: "Create sub-admin" },
  { key: "subadmin.read", description: "Read sub-admin" },
  { key: "subadmin.update", description: "Update sub-admin" },
  { key: "subadmin.delete", description: "Delete sub-admin" },

  { key: "org.user.create", description: "Create organization user" },
  { key: "org.user.read", description: "Read organization user" },
  { key: "org.user.update", description: "Update organization user" },
  { key: "org.user.delete", description: "Delete organization user" },

  { key: "org.branch.create", description: "Create organization branch" },
  { key: "org.branch.read", description: "Read organization branch" },
  { key: "org.branch.update", description: "Update organization branch" },
  { key: "org.branch.delete", description: "Delete organization branch" },

  { key: "org.department.create", description: "Create organization department" },
  { key: "org.department.read", description: "Read organization department" },
  { key: "org.department.update", description: "Update organization department" },
  { key: "org.department.delete", description: "Delete organization department" },

];


const ROLES = [
  { id: 1, name: "Super Admin" },
  { id: 2, name: "Admin" },
  { id: 3, name: "User" },
  { id: 4, name: "Organization"}
];

const ROLE_PERMISSION_MAP = {
  1: [
    "user.create",
    "user.read",
    "user.update",
    "user.delete",
    "org.create",
    "org.read",
    "org.update",
    "org.delete",
    "subadmin.create",
    "subadmin.read",
    "subadmin.update",
    "subadmin.delete",
  ],

  2: [
    "user.read",
    "org.read",
  ],

  3:[
    "user.read"
  ],

  4: [
    "user.create",
    "user.read",
    "user.update",
    "user.delete",
    "org.user.create",
    "org.user.read",
    "org.user.update",
    "org.user.delete",
    "org.branch.create",
    "org.branch.read",
    "org.branch.update",
    "org.branch.delete",
    "org.department.create",
    "org.department.read",
    "org.department.update",
    "org.department.delete",
  ]
};

const seedRBAC = async () => {
  console.log("Seeding RBAC");

  const permissionDocs = {};
  for (const perm of PERMISSIONS) {
    const doc = await Permission.findOneAndUpdate(
      { key: perm.key },
      perm,
      { upsert: true, new: true }
    );
    permissionDocs[perm.key] = doc;
  }

  for (const role of ROLES) {
    await Role.findOneAndUpdate(
      { id: role.id },
      role,
      { upsert: true }
    );
  }

  await RolePermission.deleteMany({});

  for (const [roleId, permissionKeys] of Object.entries(ROLE_PERMISSION_MAP)) {
    for (const key of permissionKeys) {
      await RolePermission.create({
        role_id: Number(roleId),
        permission_id: permissionDocs[key]._id,
      });
    }
  }

  console.log("RBAC seeded successfully");
};

export default seedRBAC;