import User from "../../../../types/User";

/* --- STATE --- */
export interface CoWorkerState {
  coWorkers: User[];
  loading: boolean;
}
