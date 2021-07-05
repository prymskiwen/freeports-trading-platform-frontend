import {
  getAllAccounts,
  assignOrganizationAccount,
  unassignOrganizationAccount,
} from "../services/accountService";

function useAccounts(): any {
  const allAccounts = async () => {
    const accounts = await getAllAccounts().then((data: any) => {
      return data;
    });
    return accounts;
  };

  const assignAccount = async (
    organizerId: string,
    accountId: string
  ): Promise<any> => {
    const assign = await assignOrganizationAccount(organizerId, accountId)
      .then((data: any) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
    return assign;
  };

  const unassignAccount = async (
    organizerId: string,
    accountId: string
  ): Promise<any> => {
    const unassign = await unassignOrganizationAccount(organizerId, accountId)
      .then((data: any) => data)
      .catch((err) => console.log(err));
    return unassign;
  };

  return { allAccounts, assignAccount, unassignAccount };
}

export default useAccounts;
