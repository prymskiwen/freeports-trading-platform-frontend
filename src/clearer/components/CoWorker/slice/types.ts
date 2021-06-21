import User from "../../../../types/User";

/* --- STATE --- */
export interface CoWorkersState {
  coWorkers: User[];
  loading: boolean;
}
