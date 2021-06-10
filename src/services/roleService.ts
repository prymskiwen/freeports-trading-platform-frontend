import axios from "../util/axios";

interface RoleType {
  id: string;
  name: string;
  permissions: Array<string>;
}
interface PermissionType {
  name: string;
  permissions: Array<{ code: string; name: string }>;
}

const addNewRole = (
  name: string,
  permissions: Array<string>
): Promise<string> => {
  return new Promise((resolve, reject) => {
    axios
      .post(`/organization/clearer/role`, {
        name,
        permissions,
      })
      .then((res: any) => {
        return resolve(res.data);
      })
      .catch((err) => {
        return reject(err.response.data);
      });
  });
};
const getClearerRoles = (): Promise<Array<RoleType>> => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/organization/clearer/role`)
      .then((res: any) => {
        return resolve(res.data);
      })
      .catch((err) => {
        return reject(err.response.data);
      });
  });
};
const getClearerPermissions = (): Promise<Array<PermissionType>> => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/permission/clearer`)
      .then((res: any) => {
        return resolve(res.data);
      })
      .catch((err) => {
        return reject(err.response.data);
      });
  });
};

export {
  getClearerRoles as default,
  addNewRole,
  getClearerRoles,
  getClearerPermissions,
};
