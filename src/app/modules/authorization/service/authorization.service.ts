import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import {
  ISignIn,
  ISignInResponse,
  ISignUp,
} from '../interfaces/auth.interface';
import { ICommonResp } from '../../../shared/interfaces/add-Issue-order.interface';
import { IChangePass } from '../interfaces/change-pass.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  authAPI = environment.authAPI;
  userAPI = environment.userAPI;

  constructor(private httpClient: HttpClient) {}

  signUp(body: ISignUp, refferalID?: string) {
    return this.httpClient.post(
      `${this.authAPI}sign-up`,
      body,
      refferalID ? { params: { ref: refferalID } } : undefined,
    );
  }

  signIn(body: ISignIn) {
    return this.httpClient.post<ISignInResponse>(
      `${this.authAPI}sign-in`,
      body,
    );
  }

  sendOTPCode(email: string) {
    return this.httpClient.post<ICommonResp>(
      `${this.userAPI}send-recovery-code`,
      null,
      {
        params: { email },
      },
    );
  }

  changePass(params: IChangePass) {
    return this.httpClient.post<ICommonResp>(
      `${this.userAPI}change-password`,
      null,
      {
        params: { ...params },
      },
    );
  }
}
