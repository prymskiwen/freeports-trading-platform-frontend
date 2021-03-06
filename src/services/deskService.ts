import axios from "../util/axios";
import Desk from "../types/Desk";

const getAllDesks = (organizationId: string): Promise<Desk[]> => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/organization/${organizationId}/desk`)
      .then((res: any) => {
        return resolve(res.data);
      })
      .catch((err) => {
        return reject(err.response.data);
      });
  });
};

const getDesk = (organizationId: string, deskId: string): Promise<Desk> => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/organization/${organizationId}/desk/${deskId}`)
      .then((res: any) => {
        return resolve(res.data);
      })
      .catch((err) => {
        return reject(err.response.data);
      });
  });
};

const createDesk = (organizationId: string, desk: Desk): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .post(`/organization/${organizationId}/desk`, desk)
      .then((res: any) => {
        return resolve(res.data);
      })
      .catch((err) => {
        return reject(err.response);
      });
  });
};

const deleteDesk = (organizationId: string, deskId: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`/organization/${organizationId}/desk/${deskId}`)
      .then((res: any) => {
        return resolve(res.data);
      })
      .catch((err) => {
        return reject(err.response);
      });
  });
};

export { getAllDesks as default, getAllDesks, getDesk, createDesk, deleteDesk };
