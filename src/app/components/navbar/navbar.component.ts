import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { Router } from '@angular/router';
import Chart from 'chart.js';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { TokenService } from '../../services/token.service';
import { OauthService } from '../../services/oauth.service';
import { InformacionUsuario } from '../../models/informacionUsuario';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES_ADMIN: RouteInfo[] = [
  { path: '/gestion-usuarios', title: 'Gestionar Usuarios',  icon: 'design_app', class: '' }
];

export const ROUTES_JUNTA_FRIE: RouteInfo[] = [
  { path: '/ofertas-academica', title: 'Ofertas Academicas',  icon: 'design_app', class: '' }
];

export const ROUTES_DIRECTOR_PROGRAMA: RouteInfo[] = [
  { path: '/crear-oferta', title: 'Crear Oferta Academica',  icon: 'design_app', class: '' },
  { path: '/mis-cursos', title: 'Mis Cursos',  icon: 'design_app', class: '' }
];

export const ROUTES_DOCENTE: RouteInfo[] = [
  { path: '/cursos-docente', title: 'Gestionar Mis Modulos',  icon: 'design_app', class: '' },
];

export const ROUTES_ESTUDIANTE: RouteInfo[] = [
  { path: '/cursos', title: 'Mis cursos',  icon: 'design_app', class: '' },
  { path: '/estudiante', title: 'Mis cursos 2',  icon: 'design_app', class: '' },
  
];

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    private listTitles: any[];
    location: Location;
      mobile_menu_visible: any = 0;
    private toggleButton: any;
    private sidebarVisible: boolean;
    public isCollapsed = true;
    private userLogged: SocialUser
    private isLogged: boolean
    menuItems: any[] = [];
    private usuario: InformacionUsuario

    constructor(
      location: Location,
      private element: ElementRef,
      private router: Router, 
      private authService: SocialAuthService,
      private tokenService: TokenService,
      private oauthService: OauthService) {
      this.location = location;
          this.sidebarVisible = false;
    }

    ngOnInit(){
      // Authentication
      this.menuItems=[]
      this.usuario = this.oauthService.getOauth()
      this.isLogged = (this.usuario != null && this.tokenService.getToken() != null)
      this.tokenService.getRoles().forEach(rol => {
        if (rol.nombre === "Administrador") {
          this.menuItems = this.menuItems.concat(ROUTES_ADMIN)
        }
        if (rol.nombre === "Secretario Junta FRIE") {
          this.menuItems = this.menuItems.concat(ROUTES_JUNTA_FRIE)
        }
        if (rol.nombre === "Director de Programa") {
          this.menuItems = this.menuItems.concat(ROUTES_DIRECTOR_PROGRAMA)
        }
        if (rol.nombre === "Docente") {
          this.menuItems = this.menuItems.concat(ROUTES_DOCENTE)
        }
        if (rol.nombre === "Estudiante") {
          this.menuItems = this.menuItems.concat(ROUTES_ESTUDIANTE)
        }
      })
      this.listTitles = ROUTES.filter(listTitle => listTitle);
      const navbar: HTMLElement = this.element.nativeElement;
      this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
      this.router.events.subscribe((event) => {
        this.sidebarClose();
         var $layer: any = document.getElementsByClassName('close-layer')[0];
         if ($layer) {
           $layer.remove();
           this.mobile_menu_visible = 0;
         }
     });
    }

    collapse(){
      this.isCollapsed = !this.isCollapsed;
      const navbar = document.getElementsByTagName('nav')[0];
      console.log(navbar);
      if (!this.isCollapsed) {
        navbar.classList.remove('navbar-transparent');
        navbar.classList.add('bg-white');
      }else{
        navbar.classList.add('navbar-transparent');
        navbar.classList.remove('bg-white');
      }

    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const mainPanel =  <HTMLElement>document.getElementsByClassName('main-panel')[0];
        const html = document.getElementsByTagName('html')[0];
        if (window.innerWidth < 991) {
          mainPanel.style.position = 'fixed';
        }

        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);

        html.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const html = document.getElementsByTagName('html')[0];
        this.toggleButton.classList.remove('toggled');
        const mainPanel =  <HTMLElement>document.getElementsByClassName('main-panel')[0];

        if (window.innerWidth < 991) {
          setTimeout(function(){
            mainPanel.style.position = '';
          }, 500);
        }
        this.sidebarVisible = false;
        html.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const html = document.getElementsByTagName('html')[0];
        var $toggle = document.getElementsByClassName('navbar-toggler')[0];

        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
        const html = document.getElementsByTagName('html')[0];

        if (this.mobile_menu_visible == 1) {
            // $('html').removeClass('nav-open');
            html.classList.remove('nav-open');
            if ($layer) {
                $layer.remove();
            }
            setTimeout(function() {
                $toggle.classList.remove('toggled');
            }, 400);

            this.mobile_menu_visible = 0;
        } else {
            setTimeout(function() {
                $toggle.classList.add('toggled');
            }, 430);

            var $layer = document.createElement('div');
            $layer.setAttribute('class', 'close-layer');


            if (html.querySelectorAll('.main-panel')) {
                document.getElementsByClassName('main-panel')[0].appendChild($layer);
            }else if (html.classList.contains('off-canvas-sidebar')) {
                document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
            }

            setTimeout(function() {
                $layer.classList.add('visible');
            }, 100);

            $layer.onclick = function() { //asign a function
              html.classList.remove('nav-open');
              this.mobile_menu_visible = 0;
              $layer.classList.remove('visible');
              setTimeout(function() {
                  $layer.remove();
                  $toggle.classList.remove('toggled');
              }, 400);
            }.bind(this);

            html.classList.add('nav-open');
            this.mobile_menu_visible = 1;

        }
    };

    getTitle(){
      var titlee = this.location.prepareExternalUrl(this.location.path());
      if(titlee.charAt(0) === '#'){
          titlee = titlee.slice( 2 );
      }
      titlee = titlee.split('/').pop();

      for(var item = 0; item < this.menuItems.length; item++){
          if(this.menuItems[item].path === '/' + titlee){
              return this.menuItems[item].title;
          }
      }
      return 'Dashboard';
    }

  logOut () {

    this.tokenService.logOut()
    if (this.authService.authState) {
      this.authService.signOut().then(data => {
        this.router.navigate(['/login'])
      },
      err=>{
        this.tokenService.logOut()
        this.router.navigate(['/login'])
      })
    }
  }
}
