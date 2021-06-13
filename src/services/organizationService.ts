import axios from "../util/axios";

const getOrganizations = (): Promise<Array<any>> => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/organization?page=1&limit=20`)
      .then((res: any) => {
        return resolve(res.data);
      })
      .catch((err) => {
        return reject(err.response.data);
      });
  });
};

const getOrganizationDetail = (id: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/organization/${id}`)
      .then((res: any) => {
        return resolve(res.data);
      })
      .catch((err) => {
        return reject(err.response.data);
      });
  });
}

export {
  getOrganizations as default,
  getOrganizations,
  getOrganizationDetail,
}