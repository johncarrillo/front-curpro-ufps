import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { InformacionUsuario } from '../../models/informacionUsuario';
import { OauthService } from '../../services/oauth.service';
import { TokenService } from '../../services/token.service';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [ 
    { path: '/gestion-usuarios', title: 'Gestionar Usuarios',  icon: 'design_app', class: '' },
    { path: '/dashboard', title: 'Dashboard',  icon: 'design_app', class: '' },
    { path: '/listado_cursos', title: 'listar curso',  icon: 'design_app', class: '' },
    { path: '/crear_curso', title: 'crear curso',  icon: 'design_app', class: '' },
    { path: '/icons', title: 'Icons',  icon:'education_atom', class: '' },
    { path: '/maps', title: 'Maps',  icon:'location_map-big', class: '' },
    { path: '/notifications', title: 'Notifications',  icon:'ui-1_bell-53', class: '' },
    { path: '/user-profile', title: 'User Profile',  icon:'users_single-02', class: '' },
    { path: '/table-list', title: 'Table List',  icon:'design_bullet-list-67', class: '' },
    { path: '/typography', title: 'Typography',  icon:'text_caps-small', class: '' },
    { path: '/upgrade', title: 'Upgrade to PRO',  icon:'objects_spaceship', class: 'active active-pro' },
    { path: '/cursos-docente', title: 'Gestionar Mis Modulos',  icon: 'design_app', class: '' },

];

export const ROUTES_ADMIN: RouteInfo[] = [
  { path: '/gestion-usuarios', title: 'Gestionar Usuarios',  icon: 'design_app', class: '' },
  { path: '/dependencia', title: 'Gestion de Dependencias',  icon: 'design_app', class: '' }
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
  { path: '/cursos', title: 'Cursos Ofertados',  icon: 'design_app', class: '' },
  { path: '/estudiante', title: 'Mis cursos',  icon: 'design_app', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  private isLogged: boolean
  private usuario: InformacionUsuario
  rol: string

  constructor(private authService: SocialAuthService, private tokenService: TokenService, private oauthService: OauthService) { }

  ngOnInit() {
    this.menuItems=[]
    this.usuario = this.oauthService.getOauth()
    this.isLogged = (this.usuario != null && this.tokenService.getToken() != null)
    this.tokenService.getRoles().forEach(rol => {
      if (rol.nombre === "Administrador") {
        this.rol = 'Administrador'
        this.menuItems = this.menuItems.concat(ROUTES_ADMIN)
      }
      if (rol.nombre === "Secretario Junta FRIE") {
        if (!this.rol) {
          this.rol = 'Secretario Junta FRIE'
        }
        this.menuItems = this.menuItems.concat(ROUTES_JUNTA_FRIE)
      }
      if (rol.nombre === "Director de Programa") {
        if (!this.rol) {
          this.rol = 'Director de Programa'
        }
        this.menuItems = this.menuItems.concat(ROUTES_DIRECTOR_PROGRAMA)
      }
      if (rol.nombre === "Docente") {
        if (!this.rol) {
          this.rol = 'Docente'
        }
        this.menuItems = this.menuItems.concat(ROUTES_DOCENTE)
      }
      if (rol.nombre === "Estudiante") {
        if (!this.rol) {
          this.rol = 'Estudiante'
        }
        this.menuItems = this.menuItems.concat(ROUTES_ESTUDIANTE)
      }
    })
     //this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
  };
}
