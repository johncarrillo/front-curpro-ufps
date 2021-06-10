import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dependencia } from '../models/dependencia';
import { DependenciaSave } from '../models/dependenciaSave';
import { DependenciaUpdate } from '../models/dependenciaUpdate';
import { Usuario } from '../models/usuario';

const cabecera = {
  headers: new HttpHeaders({'Content-Type' : 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class DependenciaService {

  dependenciaURL = 'http://localhost:8080/dependencia'
  constructor(private httpClient: HttpClient) { }

  public lista(): Observable <Dependencia[]> {
    return this.httpClient.get<Dependencia[]>(this.dependenciaURL, cabecera)
  }

  public buscar(id: number): Observable <Dependencia> {
    return this.httpClient.get<Dependencia>(this.dependenciaURL + '/' + id, cabecera)
  }

  public guardar(dependenciaSave: DependenciaSave) {
    return this.httpClient.post<Dependencia>(this.dependenciaURL, dependenciaSave, cabecera);
  }

  public actualizar(dependenciaUpdate: DependenciaUpdate): Observable<any> {
    return this.httpClient.put<Usuario>(this.dependenciaURL, dependenciaUpdate, cabecera);
  }

  public eliminar(id: number): Observable <Usuario> {
    return this.httpClient.delete<Usuario>(this.dependenciaURL + '/' + id, cabecera)
  }

}
