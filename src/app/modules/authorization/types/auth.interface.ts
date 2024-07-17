import { EAuthority } from '../enums/authority.enum';

export interface ISignUp {
  city?: string | null;
  email?: string | null;
  fullName?: string | null;
  password?: string | null;
  phoneNumber?: string | null;
}

export interface ISignIn {
  email?: string | null;
  password?: string | null;
}

export interface ISignInResponse {
  token: string;
  privilege: IUserPrivilege[];
}

export interface IUserPrivilege {
  authority: EAuthority;
}
