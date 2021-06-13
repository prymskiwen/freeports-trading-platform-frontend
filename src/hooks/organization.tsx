import { 
  getOrganizations,
  getOrganizationDetail
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
  return {organizers, getOrganizerdetail};
}

export default useOrganization;
