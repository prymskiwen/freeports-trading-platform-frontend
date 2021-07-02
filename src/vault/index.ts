import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

import { VaultResourceCreatedResponseDto } from "./dto/vault-resource-created.dto";
import { GetVaultOrganizationResponseDto } from "./dto/get-vault-organizations.dto";
import { GetVaultUsersResponseDto } from "./dto/get-vault-users.dto";
import { VaultAccountType } from "./enum/vault-account-type";
import { PermissionOwnerType } from "./enum/permission-owner-type";
import sendRequest, { Method } from "../services/vaultService";
import arrayBufferToBase64, {
  base64ToArrayBuffer,
} from "../util/keyStore/functions";

// eslint-disable-next-line no-shadow
export enum VaultPermissions {
  "GrantRevokePermission" = "GrantRevokePermission",
  "CreateOrganizationUser" = "CreateOrganizationUser",
  "CreateDeleteOrganization" = "CreateDeleteOrganization",
  "CreateDeleteUser" = "CreateDeleteUser",
  "GetUserPermissions" = "GetUserPermissions",
  "JoinOrganizationUser" = "JoinOrganizationUser",
  "GetUsers" = "GetUsers",
  "GetOrganizations" = "GetOrganizations",
  "CreateDeleteGroup" = "CreateDeleteGroup",
  "GetGroups" = "GetGroups",
  "CreateAccount" = "CreateAccount",
  // 'Wipe' = 'Wipe',
}
interface AuthenticateResponse {
  tokenString: string;
}

interface VaultError {
  name: "ValidationError" | "VaultError" | "VaultUnreachable";
  message: string;
  statusCode: number;
  error: string;
  details: string;
}

interface RequestBody {
  [key: string]: string | RequestBody;
}

export class Vault {
  private API_PREFIX = "/api/v1";

  publicKey: string;

  private hashingAlgorithm = "SHA-256";

  // eslint-disable-next-line no-useless-constructor
  constructor(private privateKey: CryptoKey, private spki: ArrayBuffer) {
    this.publicKey = this.spki2String(new Uint8Array(spki));
    console.log("publicKey", this.publicKey, privateKey);
  }

  public async createOrganization(): Promise<VaultResourceCreatedResponseDto> {
    await this.grantPermission(
      VaultPermissions.CreateDeleteOrganization,
      PermissionOwnerType.user,
      "1"
    );
    const { data } = await this.sendRequest<VaultResourceCreatedResponseDto>(
      Method.POST,
      "/vault/organization",
      true
    );
    return data;
  }

  public async createVaultUser(
    publicKey: string
  ): Promise<VaultResourceCreatedResponseDto> {
    await this.grantPermission(
      VaultPermissions.CreateDeleteUser,
      PermissionOwnerType.user,
      "1"
    );
    const { data } = await this.sendRequest<VaultResourceCreatedResponseDto>(
      Method.POST,
      "/vault/user",
      true,
      { publicKey }
    );
    return data;
  }

  public async createOrganizationUser(
    publicKey: string
  ): Promise<VaultResourceCreatedResponseDto> {
    await this.grantPermission(
      VaultPermissions.CreateDeleteUser,
      PermissionOwnerType.user,
      "1"
    );
    const { data } = await this.sendRequest<VaultResourceCreatedResponseDto>(
      Method.POST,
      "/organization/user",
      true,
      { publicKey }
    );
    return data;
  }

  public async deleteVaultUser(id: string): Promise<any> {
    await this.grantPermission(
      VaultPermissions.CreateDeleteUser,
      PermissionOwnerType.user,
      "1"
    );
    const { data } = await this.sendRequest<VaultResourceCreatedResponseDto>(
      Method.POST,
      `/vault/user/${id}`,
      true
    );
    return data;
  }

  public async deleteOrganizationUser(id: string): Promise<any> {
    await this.grantPermission(
      VaultPermissions.CreateDeleteUser,
      PermissionOwnerType.user,
      "1"
    );
    const { data } = await this.sendRequest<VaultResourceCreatedResponseDto>(
      Method.POST,
      `/organization/user/${id}`,
      true
    );
    return data;
  }

  public async grantAllPermissions(
    ownerType: PermissionOwnerType,
    ownerId: string
  ): Promise<any> {
    return Promise.all(
      Object.keys(VaultPermissions)
        .filter(
          (key) =>
            !Number.isNaN(Number(VaultPermissions[key as VaultPermissions]))
        )
        .map((permission) => {
          return this.grantPermission(
            permission as VaultPermissions,
            ownerType,
            ownerId
          );
        })
    );
  }

  public async getAllOrganizations(): Promise<GetVaultOrganizationResponseDto> {
    await this.grantPermission(
      VaultPermissions.GetOrganizations,
      PermissionOwnerType.user,
      "1"
    );
    const { data } = await this.sendRequest<GetVaultOrganizationResponseDto>(
      Method.GET,
      "/vault/organization",
      true
    );
    return data;
  }

  public async getAllVaultUsers(): Promise<GetVaultUsersResponseDto> {
    await this.grantPermission(
      VaultPermissions.GetUsers,
      PermissionOwnerType.user,
      "1"
    );
    const { data } = await this.sendRequest<GetVaultUsersResponseDto>(
      Method.GET,
      "/vault/user",
      true
    );
    return data;
  }

  public async getAllOrganizationUsers(): Promise<GetVaultUsersResponseDto> {
    await this.grantPermission(
      VaultPermissions.GetUsers,
      PermissionOwnerType.user,
      "1"
    );
    const { data } = await this.sendRequest<GetVaultUsersResponseDto>(
      Method.GET,
      `/organization/user`,
      true
    );
    return data;
  }

  public async joinOrganizationUser(
    organization: string,
    publicKey: string
  ): Promise<VaultResourceCreatedResponseDto> {
    await this.grantPermission(
      VaultPermissions.JoinOrganizationUser,
      PermissionOwnerType.user,
      "1"
    );
    const { data } = await this.sendRequest<VaultResourceCreatedResponseDto>(
      Method.POST,
      `/vault/organization/${organization}/user`,
      true,
      { publicKey }
    );
    return data;
  }

  public async createAccount(
    type: VaultAccountType
  ): Promise<VaultResourceCreatedResponseDto> {
    await this.grantPermission(
      VaultPermissions.CreateAccount,
      PermissionOwnerType.user,
      "1"
    );
    const { data } = await this.sendRequest<VaultResourceCreatedResponseDto>(
      Method.POST,
      "/vault/organization/account",
      true,
      { type }
    );
    return data;
  }

  public async authenticate() {
    const {
      data: { tokenString },
    } = await this.createToken("0");
    // this.accessToken = tokenString;
    // axios.defaults.headers.common.authorization = tokenString;
    return tokenString;
  }

  private async sendRequest<T>(
    method: Method,
    path: string,
    shouldHash = true,
    body?: any,
    headers = {}
  ): Promise<AxiosResponse<T> | any> {
    try {
      if (shouldHash) {
        const signature = await this.hashRequest(method, path, body);
        console.log("signature", signature);
        return await sendRequest({
          method,
          path,
          signature,
          body,
          headers: { ...headers, signature },
        });
      }
      return await sendRequest({
        method,
        path,
        headers,
        body,
      });
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        if (error?.response?.data.message === "ExpiredToken") {
          try {
            await this.authenticate();
            return this.sendRequest<T>(method, path, shouldHash, body, headers);
          } catch (err) {
            console.error(err);
          }
        }
      }
      return Promise.reject(error);
    }
  }

  private orderObject(original: RequestBody) {
    return Object.keys(original)
      .sort()
      .reduce((ordered: RequestBody, key: string) => {
        let val = original[key];
        if (typeof original[key] === "object" && original[key] !== null) {
          val = this.orderObject(val as RequestBody);
        }
        // eslint-disable-next-line
        ordered[key as string] = val;
        return ordered;
      }, {});
  }

  // eslint-disable-next-line class-methods-use-this
  private stringToArrayBuffer(byteString: any) {
    const byteArray = new Uint8Array(byteString.length);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < byteString.length; i++) {
      byteArray[i] = byteString.codePointAt(i);
    }
    return byteArray;
  }

  private async hashRequest(method: string, path: string, body: any) {
    console.log(
      "hash message ",
      method.toUpperCase() +
        this.API_PREFIX +
        path +
        (body ? JSON.stringify(this.orderObject(body)) : "")
    );
    const enc = new TextEncoder();
    const message = enc.encode(
      method.toUpperCase() +
        this.API_PREFIX +
        path +
        (body ? JSON.stringify(this.orderObject(body)) : "")
    );

    const signature = await this.signMessage(message);

    return signature;
  }

  private createToken(organizationId: string) {
    // const publicKeyDER = this.publicKey.export({ type: "spki", format: "der" });

    const reqBody = {
      publicKey: this.publicKey,
      organizationId,
    };

    return this.sendRequest<AuthenticateResponse>(
      Method.POST,
      "/token",
      true,
      reqBody
    );
  }

  private grantPermission(
    permissionType: VaultPermissions,
    ownerType: PermissionOwnerType,
    ownerId: string
  ) {
    return this.sendRequest(Method.POST, "/vault/permission", true, {
      permissionType,
      ownerType,
      ownerId,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  public spki2String(byteArray: Uint8Array): string {
    let binaryString = "";

    for (let i = 0; i < byteArray.byteLength; i += 1) {
      binaryString += String.fromCharCode(byteArray[i]);
    }
    const exportedAsBase64 = window.btoa(binaryString);
    return exportedAsBase64;
  }

  private async signMessage(message: ArrayBuffer): Promise<string> {
    console.log("sign message ", message);
    let signature = await window.crypto.subtle.sign(
      {
        name: "ECDSA",
        hash: { name: this.hashingAlgorithm },
      },
      this.privateKey,
      message
    );

    signature = new Uint8Array(signature);

    console.log("Signture ", arrayBufferToBase64(signature));
    return arrayBufferToBase64(signature);
  }
}
