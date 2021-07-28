export default interface Permission {
  name: string;

  permissions: Array<{ code: string; name: string }>;
}
