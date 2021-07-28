import Role from "../../../../types/Role";
import Permission from "../../../../types/Permission";

export interface OrgRolesState {
  roles: Role[];
  permissions: Permission[];
  rolesLoading: boolean;
  permissionsLoading: boolean;
  updating: boolean;
  deleting: boolean;
}
