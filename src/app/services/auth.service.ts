import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = '_token';
  constructor() { }

  getAuthorizationToken() {
    return localStorage.getItem(this.tokenKey);
  }
}
