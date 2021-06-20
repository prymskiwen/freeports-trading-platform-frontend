export default interface User {
  id: string;

  nickname: string;

  email: string;

  phone: string;

  avata: string;

  jobTitle: string;

  roles?: string[];
}
