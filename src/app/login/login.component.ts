import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { InformacionUsuario } from '../models/informacionUsuario';
import { TokenDto } from '../models/token-dto';
import { OauthService } from '../services/oauth.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private socialUser: SocialUser
  private userLogged: SocialUser
  private isLogged: boolean

  ngOnInit(): void {

    this.authService.authState.subscribe(
      data => {
        this.userLogged = data
        this.isLogged = (this.userLogged != null && this.tokenService.getToken() != null)
        /*if (data != null) {
          this.router.navigate(['/principal'])
        }*/
      }
    )
  }

  constructor(
    private authService: SocialAuthService,
    private router : Router,
    private oauthService: OauthService,
    private tokenService: TokenService) { }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
        data =>{
        console.log(data)
        this.socialUser = data
        const tokenGoogle = new TokenDto(this.socialUser.idToken)
        this.oauthService.google(tokenGoogle).subscribe(
          res => {
            this.tokenService.setToken(res.value)
            this.tokenService.setRoles(res.roles)
            let usuario : InformacionUsuario = {
              apellidos: data.lastName,
              correo: data.email,
              nombres: data.firstName,
              photoUrl: data.photoUrl,
              idToken: data.idToken
            }
            this.isLogged = true
            this.oauthService.setOauth(usuario)
            this.router.navigate(['/gestion-usuarios'])
          },
          err => {
            console.log(err)
            this.signOut()
          }
        )
    }).catch(
      err => {
        console.log(err)
      }
    )
  }

  signOut(): void {
    this.authService.signOut().then(
      data => {
        this.tokenService.logOut()
        this.isLogged = false
      }
    )
  }
}
