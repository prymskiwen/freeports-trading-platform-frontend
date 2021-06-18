import { 
  getOrganizations,
  getOrganizationDetail,
  getOrganisationManagers,
  getOrganizerManager,
  addOrganizationManager,
  addOrganizer,
  addAccount,
  updateOrganizer,
  updateOrganizerManager,
  suspendManager,
  resumeManager,
} from "../services/organizationService";

function useOrganization(): any {
  const organizers = async (pageNum: number, pagelimit: number, searchVal: string) => {
    const organizations = await getOrganizations(pageNum, pagelimit, searchVal)
      .then((data:any) => {
        return data;
      })
      .catch((err) => {
        console.log(err.message);
      })
    return organizations
  };
  const getOrganizerdetail = async (id: string) => {
    const organizationDetail = await getOrganizationDetail(id)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err.message);
      });
    return organizationDetail;
  }

  const getManagers = async (id: string) => {
    const managers = await getOrganisationManagers(id)
      .then((data) => {
        return data.content;
      })
      .catch((err) => {
        console.log(err.message);
      })
    return managers;
  }

  const addManager = async (organizerId: string, nickname: string, email: string, password: string, phone: string, avata: string) => {
    const manager = await addOrganizationManager(organizerId, nickname, email, password, phone, avata)
      .then((data) => {
        return data;
      }).catch((err) => {
        console.log(err.message);
      })
    return manager;
  }

  const getOrganizedManager = async (organizedId: string, managerId: string) => {
    const manager = await getOrganizerManager(organizedId, managerId)
    .then((data) =>{
      return data;
    })
    .catch((err) => {
      console.log(err.message);
    })
    return manager;
  }

  const addOrganization = async (
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
  ) => {
    const newOrganization = await addOrganizer(name, street, street1, zip, city, country, logofile, createtime, сommission, clearer)
      .then((data) => {
        return data;
      }).catch((err) => {
        console.log(err.message);
      });
    return newOrganization;
  }

  const additionAccount = async (
    organizerId: string,
    name: string,
    currency: string,
    type: string,
    iban: string,
    publicAddress: string,
    vaultWalletId: string,
  ) => {
    const newAddAccount = await addAccount(organizerId, name, currency, type, iban, publicAddress, vaultWalletId)
      .then((data) => {
        return data;
      }).catch((err) => {
        console.log(err.message);
      })
    return newAddAccount;
  }

  const updateOrganization = async (
    organizerId: string,
    createtime: Date,
    name: string,
    logofile: string,
    сommission: string,
    clearer: string,
  ) => {
    const updatedOrganization = await updateOrganizer(organizerId, createtime, name, logofile, сommission, clearer)
      .then((data) => {
        return data;
      }).catch((err) => {
        console.log(err.message);
      })
    return updatedOrganization;
  }

  const updateOrganizationManager = async (
    organizerId: string,
    managerId: string,
    nickname: string,
    email: string,
    phone: string,
    avata: string,
  ) => {
    const updatedOrganizationManager = await updateOrganizerManager(organizerId, managerId, nickname, email, phone, avata)
      .then((data) => {
        return data;
      }).catch((err) => {
        console.log(err.message);
      })
    return updatedOrganizationManager;
  }

  const suspendOrganizationManager = async (
    organizerId: string,
    managerId: string,
  ) => {
    const suspend = await suspendManager(organizerId, managerId)
      .then((data) => {
        return data;
      }).catch((err) => {
        console.log(err.message);
      })
    return suspend;
  }

  const resumeOrganizationManager = async (
    organizerId: string,
    managerId: string,
  ) => {
    const resume = await resumeManager(organizerId, managerId)
      .then((data) => {
        return data;
      }).catch((err) => {
        console.log(err.message);
      })
    return resume;
  }

  return {organizers, getOrganizerdetail, getManagers, addManager, getOrganizedManager, addOrganization, additionAccount, updateOrganization, updateOrganizationManager, suspendOrganizationManager, resumeOrganizationManager};
}

export default useOrganization;
