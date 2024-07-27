import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ISignIn, ISignInResponse, ISignUp } from '../types/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  authAPI = environment.authAPI;

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
}
