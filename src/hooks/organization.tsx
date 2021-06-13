import { 
  getOrganizations,
  getOrganizationDetail,
  getOrganisationManagers,
  getOrganizerManager,
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

  return {organizers, getOrganizerdetail, getManagers, getOrganizedManager};
}

export default useOrganization;
