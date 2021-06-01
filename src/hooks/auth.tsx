/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import reduxActions from '../store/actions'
// import { login } from '../service';  //, register, logout

const { 
  authLogin, 
//   authLoginSuccess, 
//   authLogout,
//   authErrors,
} = reduxActions

// redux hook
function useAuth(): any {
  const dispatch = useDispatch();

  const {
    isAuthenticated,
    loading,
    errors,
  } = useSelector((state: any) => ({
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading,
    errors: state.auth.errors,
  }), shallowEqual);

  const signIn = async (credentials: any) => {
    console.log('sing-in', credentials)

    dispatch(authLogin());

    // // const { data } = await login(credentials);
    // // console.log(data);

    // dispatch(authLoginSuccess(data));
  };

  const signOut = () => {
    // dispatch(authLogout());
    // return new Promise((resolve) => {
    //   resolve('log out');
    // });
  };

  const setErrors = (_errors: any) => {
    // dispatch(authErrors(errors));
    console.log('errors', _errors)
  };

  return {
    isAuthenticated,
    loading,
    errors,
    signIn,
    signOut,
    setErrors,
  };
}

export {
    useAuth as default,
    useAuth,
}
