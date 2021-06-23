import { RoleType } from "../clearer/components/Roles";

export default interface User {
  id?: string;

  nickname: string;

  email: string;

  phone: string;

  avatar: string;

  jobTitle: string;

  roles?: string[];
}
