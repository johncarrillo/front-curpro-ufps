import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Presupuesto } from '../models/presupuesto';

const cabecera = {
  headers: new HttpHeaders({'Content-Type' : 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class PresupuestoService {

  presupuestoURL = 'http://localhost:8080/curso/presupuesto'

  constructor(private httpClient: HttpClient) { }

  public buscar(id: number): Observable <Presupuesto> {
    return this.httpClient.get<any>(this.presupuestoURL + '/' + id, cabecera)
  }

}
