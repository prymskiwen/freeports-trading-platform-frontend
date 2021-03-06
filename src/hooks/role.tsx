import { useDispatch } from "react-redux";

import reduxActions from "../store/actions";
import {
  getClearerRoles,
  addNewRole,
  modifyRole,
  deleteRole,
  getClearerPermissions,
} from "../services/roleService";

const { clearError, setError } = reduxActions;
interface RoleType {
  name: string;
  permissions: Array<string>;
}

function useRole(): any {
  const dispatch = useDispatch();

  const createNewRole = async (newRole: RoleType) => {
    dispatch(clearError());
    const newRoleId = await addNewRole(newRole.name, newRole.permissions)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        dispatch(setError(err));
      });

    return newRoleId;
  };
  const updateRole = async (id: string, newRole: RoleType) => {
    dispatch(clearError());
    const newRoleId = await modifyRole(id, newRole.name, newRole.permissions)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        dispatch(setError(err));
      });

    return newRoleId;
  };
  const removeRole = async (id: string) => {
    dispatch(clearError());
    const oldRoleId = await deleteRole(id)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        dispatch(setError(err));
      });

    return oldRoleId;
  };
  const retrieveRoles = async () => {
    dispatch(clearError());
    const roles = await getClearerRoles()
      .then((data) => {
        return data;
      })
      .catch((err) => {
        dispatch(setError(err));
      });

    return roles;
  };
  const retrievePermissions = async () => {
    dispatch(clearError());
    const roles = await getClearerPermissions()
      .then((data) => {
        return data;
      })
      .catch((err) => {
        dispatch(setError(err));
      });

    return roles;
  };

  return {
    createNewRole,
    updateRole,
    removeRole,
    retrieveRoles,
    retrievePermissions,
  };
}

export default useRole;
