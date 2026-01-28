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
    "org.delete"
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