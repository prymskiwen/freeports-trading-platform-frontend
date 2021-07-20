export default interface Investor {
  id?: string;

  name: string;

  accounts?: Array<{
    name: string;
    currency: string;
    balance: number;
    publicAddress: string;
    vaultWalletId: string;
  }>;

  createdAt?: string;
}
