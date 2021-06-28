// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

import { CoWorkersState } from "../../clearer/components/CoWorker/slice/types";
import { CoWorkerFormState } from "../../clearer/components/CoWorkerForm/slice/types";
import { SnackbarState } from "../../components/Snackbar/slice/types";
import { ProfileState } from "../../components/Profile/slice/types";

/* 
  Because the redux-injectors injects your
   reducers asynchronously somewhere in your code
  You have to declare them here manually
  Properties are optional because they are injected when 
  the components are mounted sometime in your application's life. 
  So, not available always
*/
export interface RootState {
  coWorkers?: CoWorkersState;
  global?: any;
  auth?: any;
  coWorkerForm: CoWorkerFormState;
  profileForm?: ProfileState;
  snackbar: SnackbarState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for
  // generating containers seamlessly
}
