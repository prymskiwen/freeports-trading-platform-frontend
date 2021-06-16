import { shallowEqual, useDispatch, useSelector } from "react-redux";

import reduxActions from "../store/actions";
import { login, qrCodeGen, otpCheck } from "../services/authService";

const {
  authLogin,
  authLoginSuccess,
  authLoginFailed,
  authLogout,
  clearError,
  setError,
  authOTPCheck,
  authOTPCheckSuccess,
  authOTPCheckFailed,
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
        error: state.global.error,
      }),
      shallowEqual
    );

  const signIn = async (credentials: any) => {
    dispatch(authLogin());
    dispatch(clearError());

    await login(credentials)
      .then((data) => {
        dispatch(authLoginSuccess(data));
      })
      .catch((err) => {
        dispatch(setError(err));
        dispatch(authLoginFailed());
      });
  };

  const signOut = () => {
    dispatch(authLogout());
  };

  const generateQRCode = async () => {
    let qrCode = "";

    await qrCodeGen()
      .then((data) => {
        qrCode = data;
      })
      .catch((err) => {
        dispatch(setError(err));
      });

    return qrCode;
  };

  const checkOTP = async (password: string) => {
    dispatch(authOTPCheck());
    dispatch(clearError());

    await otpCheck(password)
      .then((data) => {
        dispatch(authOTPCheckSuccess(data));
      })
      .catch((err) => {
        dispatch(setError(err));
        dispatch(authOTPCheckFailed());
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
