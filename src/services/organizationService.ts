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
};

const getOrganisationManagers = (id: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/organization/${id}/user?page=1&limit=20`)
      .then((res: any) => {
        return resolve(res.data);
      })
      .catch((err) => {
        return reject(err.response.data);
      });
  });
};

const getOrganizerManager = (organizerId: string, managerid: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/organization/${organizerId}/user/${managerid}`)
      .then((res) => {
        return resolve(res.data);
      })
      .catch((err) => {
        return reject(err.response.data);
      });
  });
};

const updateOrganizerManager = (organizerId: string, managerId: string, nickname: string, email: string, phone: string, avata: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .patch(`/organization/${organizerId}/user/${managerId}`, {
        nickname,
        email,
        phone,
        avata,
      }).then((res) => {
        return resolve(res.data);
      }).catch((err) => {
        return reject(err.response);
      });
  });
};

const addOrganizer = (
  name: string,
  street: string,
  street1: string,
  zip: string,
  city: string,
  country: string,
  logofile: string,
  createtime: Date,
  сommission: string,
  clearer: string,
): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .post(`/organization`, {
        name,
        street,
        street1,
        zip,
        city,
        country,
        logofile,
        сommission,
        clearer,
        createtime,
      }).then((res: any) => {
        return resolve(res.data);
      }).catch((err) => {
        return reject(err.response.data);
      })
  })
}

const updateOrganizer = (
  organization: string,
  createtime: Date,
  name: string,
  logofile: string,
  сommission: string,
  clearer: string,
): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .patch(`/organization/${organization}`, {
        name,
        createtime,
        logofile,
        сommission,
        clearer,
      }).then((res: any) => {
        return resolve(res.data);
      }).catch((err) => {
        return reject(err.repsonse);
      })
  })
}

const addAccount = (
  organizerId: string,
  name: string,
  currency: string,
  type: string,
  iban: string,
  publicAddress: string,
  vaultWalletId: string,
): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .post(`/organization/${organizerId}/account`, {
        name, currency, type, iban, publicAddress, vaultWalletId
      })
      .then((res: any) => {
        return resolve(res.data);
      })
      .catch((err) => {
        return reject(err.response.data);
      })
  })
}

export {
  getOrganizations as default,
  getOrganizations,
  getOrganizationDetail,
  getOrganisationManagers,
  getOrganizerManager,
  addOrganizer,
  addAccount,
  updateOrganizer,
  updateOrganizerManager,
}