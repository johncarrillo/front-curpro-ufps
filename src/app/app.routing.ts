import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { PrincipalComponent } from './principal/principal.component';
import { UsuarioGuard } from './guards/usuario.guard';
import { CrearCursoComponent } from './curso/crear-curso/crear-curso.component';
import { GestionUsuariosComponent } from './gestion-usuarios/gestion-usuarios.component';
import { ListarCursoComponent } from './curso/listar-curso/listar-curso.component';
import { from } from 'rxjs';
import { ActasComponent } from './curso/actas/actas.component';
import { SubirSustentacionComponent } from './curso/subir-sustentacion/subir-sustentacion.component';
import { DependenciaComponent } from './dependencia/dependencia.component';
import { DocenteComponent } from './docente/docente.component';
import { EstudianteComponent } from './estudiante/estudiante.component';
import { ModuloComponent } from './curso/crear-curso/modulo/modulo.component';




const routes: Routes =[
  {
    path: 'login',
    component: LoginComponent
  },{
    path: 'mis-cursos',
    component: ListarCursoComponent
  }
  ,
  {
    path: 'crear-oferta',
    component: CrearCursoComponent
  },{
    path: 'crear-oferta/:id',
    component: CrearCursoComponent
  },{
    path: 'modulo/:id',
    component: ModuloComponent
  },{
    path: 'subir-acta',
    component: ActasComponent
  },{
    path: 'estudiante',
    component: EstudianteComponent
  },{
    path: 'cursos-docente',
    component: DocenteComponent
    //canActivate: [UsuarioGuard]
  },
  {
    path: 'nota-sustentacion',
    component: SubirSustentacionComponent
  },
  {
    path: 'principal',
    component: PrincipalComponent,
    canActivate: [UsuarioGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
  },
  {
    path: 'gestion-usuarios',
    component: GestionUsuariosComponent,
    //canActivate: [UsuarioGuard]
  },
  {
    path: 'ofertas-academica',
    component: GestionUsuariosComponent,
    //canActivate: [UsuarioGuard]
  },
  {
    path: 'dependencia',
    component: DependenciaComponent,
    //canActivate: [UsuarioGuard]
  }]}
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: true }),
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
