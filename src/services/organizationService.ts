import axios from "../util/axios";

const getOrganizations = (
  pageNum: number,
  pagelimit: number,
  searchVal: string
): Promise<Array<any>> => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `/organization?page=${pageNum}&limit=${pagelimit}&search=${searchVal}`
      )
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

const addOrganizationManager = (
  organizationId: string,
  nickname: string,
  email: string,
  password: string,
  phone: string,
  avatar: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .post(`/organization/${organizationId}/manager`, {
        nickname,
        email,
        password,
        phone,
        avatar,
      })
      .then((res: any) => {
        return resolve(res.data);
      })
      .catch((err) => {
        return reject(err.response);
      });
  });
};

const getOrganizationManagers = (id: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/organization/${id}/manager`)
      .then((res: any) => {
        return resolve(res.data);
      })
      .catch((err) => {
        return reject(err.response.data);
      });
  });
};

const getOrganizerManager = (
  organizerId: string,
  managerid: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/organization/${organizerId}/manager/${managerid}`)
      .then((res) => {
        return resolve(res.data);
      })
      .catch((err) => {
        return reject(err.response.data);
      });
  });
};

const updateOrganizerManager = (
  organizerId: string,
  managerId: string,
  nickname: string,
  email: string,
  phone: string,
  avatar: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .patch(`/organization/${organizerId}/manager/${managerId}`, {
        nickname,
        email,
        phone,
        avatar,
      })
      .then((res) => {
        return resolve(res.data);
      })
      .catch((err) => {
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
  logo: string,
  commissionOrganization: string,
  commissionClearer: string
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
        logo,
        commissionOrganization,
        commissionClearer,
      })
      .then((res: any) => {
        return resolve(res.data);
      })
      .catch((err) => {
        return reject(err.response.data);
      });
  });
};

const updateOrganizer = (
  organization: string,
  createdAt: Date,
  name: string,
  logo: string,
  commissionOrganization: string,
  commissionClearer: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .patch(`/organization/${organization}`, {
        name,
        createdAt,
        logo,
        commissionOrganization,
        commissionClearer,
      })
      .then((res: any) => {
        return resolve(res.data);
      })
      .catch((err) => {
        return reject(err.repsonse);
      });
  });
};

const addAccount = (
  organizerId: string,
  name: string,
  currency: string,
  type: string,
  iban: string,
  publicAddress: string,
  vaultWalletId: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .post(`/organization/${organizerId}/account`, {
        name,
        currency,
        type,
        iban,
        publicAddress,
        vaultWalletId,
      })
      .then((res: any) => {
        return resolve(res.data);
      })
      .catch((err) => {
        return reject(err.response.data);
      });
  });
};

const suspendManager = (
  organizerId: string,
  managerId: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .put(`/organization/${organizerId}/manager/${managerId}/suspend`)
      .then((res: any) => {
        return resolve(res.data);
      })
      .catch((err) => {
        return reject(err.response);
      });
  });
};

const resumeManager = (
  organizerId: string,
  managerId: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .put(`/organization/${organizerId}/manager/${managerId}/resume`)
      .then((res: any) => {
        return resolve(res.data);
      })
      .catch((err) => {
        return reject(err.response);
      });
  });
};

export {
  getOrganizations as default,
  getOrganizations,
  getOrganizationDetail,
  getOrganizationManagers,
  getOrganizerManager,
  addOrganizationManager,
  addOrganizer,
  addAccount,
  updateOrganizer,
  updateOrganizerManager,
  suspendManager,
  resumeManager,
};
