import PaginatedResponse from "../types/PaginatedResponse";
import { ResourceCreatedResponse } from "../types/ResourceCreatedResponse";
import User from "../types/User";
import axios from "../util/axios";

const getClearerUsers = (): Promise<PaginatedResponse<User>> => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/user`)
      .then((res: any) => {
        res.data?.content?.map((u: any) => {
          // eslint-disable-next-line no-param-reassign
          u.roles = u.roles.map((r: any) => r.role);

          return u;
        });
        return resolve(res.data);
      })
      .catch((err) => {
        return reject(err.response.data);
      });
  });
};

const createClearerUser = (user: User): Promise<ResourceCreatedResponse> => {
  return new Promise((resolve, reject) => {
    axios
      .post(`/user`, user)
      .then((res: any) => {
        return resolve(res.data);
      })
      .catch((err) => {
        return reject(err.response.data);
      });
  });
};

export { createClearerUser, getClearerUsers as default };
