import { 
  getOrganizations,
  getOrganizationDetail,
  getOrganisationManagers,
  getOrganizerManager,
  addOrganizer,
} from "../services/organizationService";

function useOrganization(): any {
  const organizers = async () => {
    const organizations = await getOrganizations()
      .then((data:any) => {
        return data.content;
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
    сommission: string,
    clearer: string,
  ) => {
    const newOrganization = await addOrganizer(name, street, street1, zip, city, country, logofile, сommission, clearer)
      .then((data) => {
        return data;
      }).catch((err) => {
        console.log(err.message);
      });
    return newOrganization;
  }

  return {organizers, getOrganizerdetail, getManagers, getOrganizedManager, addOrganization};
}

export default useOrganization;
