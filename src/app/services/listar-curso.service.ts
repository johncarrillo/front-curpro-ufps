import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListaCursos } from '../models/listaCurso';

const cabecera = {
  headers: new HttpHeaders({'Content-Type' : 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class ListarCursoService {

  listarCursoURL = 'http://localhost:8080/curso'

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable <ListaCursos[]> {
    return this.httpClient.get<ListaCursos[]>(this.listarCursoURL, cabecera)
  }
}
