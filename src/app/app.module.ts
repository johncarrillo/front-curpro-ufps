import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { PrincipalComponent } from './principal/principal.component';
import { usuarioInterceptor } from './interceptor/usuario.interceptor';
import { BrowserModule } from '@angular/platform-browser'
import { CommonModule, DatePipe, } from '@angular/common';
import {  GestionUsuariosComponent } from './gestion-usuarios/gestion-usuarios.component'
import { DependenciaComponent } from './dependencia/dependencia.component';
import { AgregarUsuarioComponent } from './gestion-usuarios/agregar-usuario/agregar-usuarios.component';
import { FormularioDependenciaComponent } from './dependencia/formulario-dependencia/formulario-dependencia.component';

// social login
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';

import { CursoComponent } from './curso/curso.component';
import { CrearCursoComponent } from './curso/crear-curso/crear-curso.component';
import { ListarCursoComponent } from './curso/listar-curso/listar-curso.component';
import { IngresoComponent } from './curso/crear-curso/ingreso/ingreso.component';
import { GastosComponent } from './curso/crear-curso/gastos/gastos.component';
import { DataTablesModule } from 'angular-datatables';
import { CronogramaComponent } from './curso/crear-curso/cronograma/cronograma.component';
import { ModuloComponent } from './curso/crear-curso/modulo/modulo.component';
import { ActasComponent } from './curso/actas/actas.component';
import { SubirSustentacionComponent } from './curso/subir-sustentacion/subir-sustentacion.component';
import { EstudianteComponent } from './estudiante/estudiante.component';
import { DocenteComponent } from './docente/docente.component';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    NgbModule,
    ToastrModule.forRoot(),
    SocialLoginModule,
    CommonModule,

    ReactiveFormsModule,
    DataTablesModule,

    ReactiveFormsModule

  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    PrincipalComponent,
    GestionUsuariosComponent,
    CrearCursoComponent,
    CursoComponent,
    ListarCursoComponent,
    IngresoComponent,
    GastosComponent,
    CronogramaComponent,
    ModuloComponent,
    ActasComponent,
    EstudianteComponent,
    SubirSustentacionComponent,
    DocenteComponent,
    DependenciaComponent,
    AgregarUsuarioComponent,
    FormularioDependenciaComponent

  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '454472846313-58dv6a84ppt618j3vlhk5qrrlt7hna1c.apps.googleusercontent.com'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    },
    usuarioInterceptor,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
