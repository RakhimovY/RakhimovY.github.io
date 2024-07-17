import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ISignIn, ISignInResponse, ISignUp } from '../types/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  authService = environment.authService;

  constructor(private httpClient: HttpClient) {}

  signUp(body: ISignUp) {
    return this.httpClient.post(`${this.authService}sign-up`, body);
  }

  signIn(body: ISignIn) {
    return this.httpClient.post<ISignInResponse>(
      `${this.authService}sign-in`,
      body,
    );
  }
}
