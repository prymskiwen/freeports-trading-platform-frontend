import PaginatedResponse from "../types/PaginatedResponse";
import User from "../types/User";
import axios from "../util/axios";

const getClearerUsers = (): Promise<PaginatedResponse<User>> => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/user`)
      .then((res: any) => {
        return resolve(res.data);
      })
      .catch((err) => {
        return reject(err.response.data);
      });
  });
};

export { getClearerUsers as default };
