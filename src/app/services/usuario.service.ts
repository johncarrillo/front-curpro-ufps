import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RolAsignarUsuario } from '../models/RolAsignarUsuario';
import { Usuario } from '../models/usuario';

const cabecera = {
  headers: new HttpHeaders({'Content-Type' : 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuarioURL = 'http://localhost:8080/usuario'
  constructor(private httpClient: HttpClient) { }

  public lista(): Observable <Usuario[]> {
    return this.httpClient.get<Usuario[]>(this.usuarioURL, cabecera)
  }

  public buscar(id: number): Observable <Usuario> {
    return this.httpClient.get<Usuario>(this.usuarioURL + '/' + id, cabecera)
  }

  public guardar(usuarioDto: Usuario): Observable<Usuario> {
    return this.httpClient.post<Usuario>(this.usuarioURL, usuarioDto, cabecera);
  }

  public actualizar(usuarioDto: Usuario): Observable<any> {
    return this.httpClient.put<Usuario>(this.usuarioURL, usuarioDto, cabecera);
  }

  public eliminar(id: number): Observable <Usuario> {
    return this.httpClient.delete<Usuario>(this.usuarioURL + '/' + id, cabecera)
  }

  public asignarRol(rolAsignarUsuario: RolAsignarUsuario): Observable<Usuario> {
    return this.httpClient.post<Usuario>(this.usuarioURL + '/asignarRol', rolAsignarUsuario, cabecera);
  }

  public listarDirectores(): Observable <Usuario[]> {
    return this.httpClient.get<Usuario[]>(this.usuarioURL + '/directores', cabecera)
  }
}
