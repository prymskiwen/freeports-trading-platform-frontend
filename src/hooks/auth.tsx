import { shallowEqual, useDispatch, useSelector } from "react-redux";

import reduxActions from "../store/actions";
import { login } from "../services/authService";

const { authLogin, authLoginSuccess, authLogout, authLoginError } =
  reduxActions;

function useAuth(): any {
  const dispatch = useDispatch();

  const { isAuthenticated, loading, errors } = useSelector(
    (state: any) => ({
      isAuthenticated: state.auth.isAuthenticated,
      loading: state.auth.loading,
      errors: state.auth.errors,
    }),
    shallowEqual
  );

  const signIn = async (credentials: any) => {
    dispatch(authLogin());

    await login(credentials)
      .then((data) => {
        console.log(data);
        // dispatch(authLoginSuccess(data));
      })
      .catch((err) => {
        dispatch(authLoginError(err.message));
      });
  };

  const signOut = () => {
    dispatch(authLogout());
    // return new Promise((resolve) => {
    //   resolve('log out');
    // });
  };

  const setError = (error: any) => {
    dispatch(authLoginError(error));
  };

  return {
    isAuthenticated,
    loading,
    errors,
    signIn,
    signOut,
    setError,
  };
}

export { useAuth as default, useAuth };
