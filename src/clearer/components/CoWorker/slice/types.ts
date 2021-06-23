import User from "../../../../types/User";

/* --- STATE --- */
export interface CoWorkersState {
  coWorkers: User[];
  selectedCoWorker: User;
  loading: boolean;
  formLoading: boolean;
}
