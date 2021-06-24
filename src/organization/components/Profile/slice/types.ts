export interface OrganizationProfileType {
  id: string;
  nickname: string;
  email: string;
  phone?: string;
  jobTitle?: string;
  avatar?: string;
  suspended: boolean;
}

/* --- STATE --- */
export interface ProfileState {
  profile: OrganizationProfileType;
  loading: boolean;
}

export interface keyPairType {
  publicKey: CryptoKey | null;
  privateKey: CryptoKey;
  name: string;
  spki: ArrayBuffer;
}
