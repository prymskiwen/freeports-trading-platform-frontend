import { useSelector } from "react-redux";
import { selectUser } from "../slice/selectors";
import { PermissionAny } from "../types/Permissions";
import hasPermission from "../util/hasPermission";

const usePermissions = () => {
  const currentUser = useSelector(selectUser);

  const userHasPermissions = (permission: PermissionAny[]) => {
    if (currentUser) {
      return hasPermission(currentUser, permission);
    }
    return false;
  };

  return { userHasPermissions };
};

export { usePermissions as default, usePermissions };
