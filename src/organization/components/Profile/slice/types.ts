export interface OrganizationProfileType {
  id: string;
  nickname: string;
  email: string;
  phone?: string;
  jobTitle?: string;
  avatar?: string;
  suspended: boolean;
}

interface KeyPairType {
  key: string;
  passphrase: string;
}
/* --- STATE --- */
export interface ProfileState {
  profile: OrganizationProfileType;
  keyPair: KeyPairType;
  encryptedKey: string;
  loading: boolean;
}
