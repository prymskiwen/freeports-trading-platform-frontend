import axios from "../util/axios";

const getAllAccounts = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/account`)
      .then((res: any) => {
        return resolve(res.data);
      })
      .catch((err) => {
        return reject(err.response.data);
      })
  })
}

const assignOrganizationAccount = (organizerId: string, accountId: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .put(`/account/${accountId}/${organizerId}`)
      .then((res: any) => {
        return resolve(res.data);
      }).catch((err) => {
        return reject(err.response);
      })
  })
}

export {
  getAllAccounts as default,
  getAllAccounts,
  assignOrganizationAccount,
}