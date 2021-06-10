import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SocialAuthService } from 'angularx-social-login';
import { Observable } from 'rxjs';
import { InformacionUsuario } from '../models/informacionUsuario';
import { TokenDto } from '../models/token-dto';

const cabecera = {
  headers: new HttpHeaders({'Content-Type' : 'application/json'})
}

const AUTH_KEY = 'usuarioSesion'

@Injectable({
  providedIn: 'root'
})
export class OauthService {

  private tokenDto: TokenDto
  private oauthService: SocialAuthService
  

  oauthURL = 'http://localhost:8080/oauth/'
  constructor(private httpClient: HttpClient) { }

  public google(tokenDto: TokenDto): Observable<TokenDto> {
    return this.httpClient.post<TokenDto>(this.oauthURL + 'google', tokenDto, cabecera);
  }

  public getOauth(): InformacionUsuario {
    return JSON.parse(sessionStorage.getItem(AUTH_KEY))
  }

  public setOauth(oauthService: InformacionUsuario): void {
    sessionStorage.removeItem(AUTH_KEY)
    sessionStorage.setItem(AUTH_KEY, JSON.stringify(oauthService))
  }
}
