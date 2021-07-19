interface VaultUser {
  id: string;
  publicKey: string;
}

export interface GetVaultUsersResponseDto {
  users: VaultUser[];
}
