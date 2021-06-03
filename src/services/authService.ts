import axios from "axios";

interface LoginParamsType {
  email: string;
  password: string;
}
interface LoginUserResponseType {
  id: string;
  nickname: string;
  email: string;
}
interface LoginTokenResponseType {
  tokenType: string;
  accessToken: string;
  accessTokenExpires: string;
  refreshToken: string;
  refreshTokenExpires: string;
}
interface LoginResponseType {
  user: LoginUserResponseType;
  token: LoginTokenResponseType;
}

const API_URL = process.env.REACT_APP_API_URL;

const login = (credentials: LoginParamsType): Promise<LoginResponseType> => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/auth/login`, credentials)
      .then((res: any) => {
        return resolve(res.data);
      })
      .catch((err) => {
        return reject(err.response.data);
      });
  });
};

export { login as default, login };
