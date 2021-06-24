import axios from "../util/axios";

const getUserProfile = (orgId: string, userId: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/organization/${orgId}/user/${userId}`)
      .then((res: any) => {
        return resolve(res.data);
      })
      .catch((err) => {
        return reject(err.response.data);
      });
  });
};

export { getUserProfile as default, getUserProfile };
