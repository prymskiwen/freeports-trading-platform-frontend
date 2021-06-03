import { shallowEqual, useDispatch, useSelector } from "react-redux";

import reduxActions from "../store/actions";
import { login } from "../services/authService";

const { authLogin, authLoginSuccess, authLogout, authLoginError } =
  reduxActions;

function useAuth(): any {
  const dispatch = useDispatch();

  const { isAuthenticated, loading, error } = useSelector(
    (state: any) => ({
      isAuthenticated: state.auth.isAuthenticated,
      loading: state.auth.loading,
      error: state.auth.error,
    }),
    shallowEqual
  );

  const signIn = async (credentials: any) => {
    dispatch(authLogin());

    await login(credentials)
      .then((data) => {
        dispatch(authLoginSuccess(data));
      })
      .catch((err) => {
        dispatch(authLoginError(err.message));
      });
  };

  // const checkOTP = async (password: string) => {};

  const signOut = () => {
    dispatch(authLogout());
    // return new Promise((resolve) => {
    //   resolve('log out');
    // });
  };

  const setError = (err: any) => {
    dispatch(authLoginError(err));
  };

  return {
    isAuthenticated,
    loading,
    error,
    signIn,
    signOut,
    setError,
  };
}

export { useAuth as default, useAuth };
