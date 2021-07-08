export default interface Account {
  name: string;

  currency: string;

  type: string;

  balance?: number;

  iban?: string;

  publicAddress?: string;

  vaultWalletId?: string;
}
