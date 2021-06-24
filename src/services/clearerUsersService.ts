import PaginatedResponse from "../types/PaginatedResponse";
import { ResourceCreatedResponse } from "../types/ResourceCreatedResponse";
import User from "../types/User";
import axios from "../util/axios";

const getClearerUsers = (search?: string): Promise<PaginatedResponse<User>> => {
  console.log("Get clearer user s", search);
  return new Promise((resolve, reject) => {
    axios
      .get(`/user${search ? `?search=${search}` : ""}`)
      .then((res: any) => {
        return resolve(res.data);
      })
      .catch((err) => {
        console.error(err);
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

const getClearerUser = (id: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/user/${id}`)
      .then((res: any) => {
        console.log("map user ", res.data);
        res.data.roles = res.data.roles?.map((r: any) => r.id);

        return resolve(res.data);
      })
      .catch((err) => {
        return reject(err.response.data);
      });
  });
};

const updateClearerUser = (id: string, user: User): Promise<User> => {
  return new Promise((resolve, reject) => {
    axios
      .patch(`/user/${id}`, user)
      .then((res: any) => {
        console.log(" user update response ", res.data);

        return resolve(res.data);
      })
      .catch((err) => {
        return reject(err.response.data);
      });
  });
};

export {
  createClearerUser,
  getClearerUsers as default,
  getClearerUser,
  updateClearerUser,
};
