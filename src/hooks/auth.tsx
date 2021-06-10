import { shallowEqual, useDispatch, useSelector } from "react-redux";

import reduxActions from "../store/actions";
import { login, qrCodeGen, otpCheck } from "../services/authService";

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

  const { authStep, isAuthenticated, isOTPDefined, loading, error } =
    useSelector(
      (state: any) => ({
        authStep: state.auth.authStep,
        isAuthenticated: state.auth.isAuthenticated,
        isOTPDefined: state.auth.isOTPDefined,
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

  const signOut = () => {
    dispatch(authLogout());
  };

  const setError = (err: any) => {
    dispatch(setAuthError(err));
  };

  const generateQRCode = async () => {
    let qrCode = "";

    await qrCodeGen()
      .then((data) => {
        qrCode = data;
      })
      .catch((err) => {
        dispatch(setAuthError(err.message));
      });

    return qrCode;
  };

  const checkOTP = async (password: string) => {
    dispatch(authOTPCheck());

    await otpCheck(password)
      .then((data) => {
        dispatch(authOTPCheckSuccess(data));
      })
      .catch((err) => {
        dispatch(setAuthError(err.message));
      });
  };

  return {
    authStep,
    isAuthenticated,
    isOTPDefined,
    loading,
    error,
    signIn,
    signOut,
    setError,
    generateQRCode,
    checkOTP,
  };
}

export default useAuth;
