import { useDispatch } from "react-redux";
import { getClearerUser } from "../services/clearerUsersService";
import reduxActions from "../store/actions";

const { clearError, setError } = reduxActions;

function useClearer(): any {
  const dispatch = useDispatch();

  const getClearerDetail = async (id: string) => {
    dispatch(clearError());
    const clearer = await getClearerUser(id)
      .then((data: any) => {
        return data;
      })
      .catch((err) => {
        dispatch(setError(err));
      });
    return clearer;
  };

  return {
    getClearerDetail,
  };
}

export default useClearer;
