import {
  getClearerRoles,
  getClearerPermissions,
} from "../services/roleService";

function useRole(): any {
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
    retrieveRoles,
    retrievePermissions,
  };
}

export default useRole;
