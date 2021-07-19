import User from "../types/User";

/* --- STATE --- */
export interface GlobalState {
  user: User | undefined;
  loading: boolean;
  theme: string;
  error: { errorType: string; message: string } | undefined;
}
