import axios from "../util/axios";

// eslint-disable-next-line no-shadow
export enum Method {
  "POST" = "POST",
  "GET" = "GET",
  "DELETE" = "DELETE",
}
export interface VaultRequestDto {
  method: Method;
  path: string;
  body?: any;
  headers?: {
    signature?: string;
    authorization?: string;
    "signature-type"?: string;
  };
}
const sendRequest = (request: VaultRequestDto): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .post("/vault/request", request)
      .then((res: any) => {
        return resolve(res.data);
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

export default sendRequest;
