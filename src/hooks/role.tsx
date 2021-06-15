import {
  getClearerRoles,
  addNewRole,
  modifyRole,
  getClearerPermissions,
} from "../services/roleService";

interface RoleType {
  name: string;
  permissions: Array<string>;
}

function useRole(): any {
  const createNewRole = async (newRole: RoleType) => {
    const newRoleId = await addNewRole(newRole.name, newRole.permissions)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err.message);
      });

    return newRoleId;
  };
  const updateRole = async (id: string, newRole: RoleType) => {
    const newRoleId = await modifyRole(id, newRole.name, newRole.permissions)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err.message);
      });

    return newRoleId;
  };
  const retrieveRoles = async () => {
    const roles = await getClearerRoles()
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err.message);
      });

    return roles;
  };
  const retrievePermissions = async () => {
    const roles = await getClearerPermissions()
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err.message);
      });

    return roles;
  };

  return {
    createNewRole,
    updateRole,
    retrieveRoles,
    retrievePermissions,
  };
}

export default useRole;