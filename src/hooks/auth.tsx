import { shallowEqual, useDispatch, useSelector } from "react-redux";

import reduxActions from "../store/actions";
import { login } from "../services/authService";

const {
  authLogin,
  authLoginSuccess,
  authLogout,
  setAuthError,
  authOTPCheck,
  authOTPCheckSuccess,
} = reduxActions;

function useAuth(): any {
  const dispatch = useDispatch();

  const { isSignInAuthenticated, isAuthenticated, loading, error } =
    useSelector(
      (state: any) => ({
        isSignInAuthenticated: state.auth.isSignInAuthenticated,
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
        dispatch(setAuthError(err.message));
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
    dispatch(setAuthError(err));
  };

  const checkOTP = (password: string) => {
    dispatch(authOTPCheck());

    dispatch(authOTPCheckSuccess(password));
  };

  return {
    isSignInAuthenticated,
    isAuthenticated,
    loading,
    error,
    signIn,
    signOut,
    setError,
    checkOTP,
  };
}

export { useAuth as default, useAuth };
