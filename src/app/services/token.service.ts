import { Injectable } from '@angular/core';
import { Rol } from '../models/rol';

const TOKEN_KEY = 'AuthToken'
const TOKEN_ROLES = 'AuthRoles'

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY)
  }

  public getRoles(): Rol[] {
    return JSON.parse(sessionStorage.getItem(TOKEN_ROLES))
  }

  public setToken(token: string): void {
    sessionStorage.removeItem(TOKEN_KEY)
    sessionStorage.setItem(TOKEN_KEY, token)
  }

  public setRoles(roles: Rol[]): void {
    sessionStorage.removeItem(TOKEN_ROLES)
    sessionStorage.setItem(TOKEN_ROLES, JSON.stringify(roles))
  }

  logOut(): void {
    sessionStorage.clear()
  }
}
