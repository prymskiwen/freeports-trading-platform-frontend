import { RoleResponse, CurrentUser } from "../types/User";
import { PermissionAny } from "../types/Permissions";

const hasPermission = (
  user: CurrentUser,
  permissions: PermissionAny[]
): boolean => {
  if (user.roles.length) {
    const userPermissions = user.roles.reduce(
      (prev: string[], userRole: RoleResponse) => {
        if (userRole.permissions) {
          return prev.concat(userRole.permissions);
        }
        return prev;
      },
      []
    );

    return permissions.some((permission) =>
      userPermissions.includes(permission)
    );
  }
  return false;
};

export { hasPermission as default, hasPermission };
