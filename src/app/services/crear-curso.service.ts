import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CursoAndPresupuesto } from '../models/curso-and-presupuesto';
import { CursoSave } from '../models/curso-save';
import { EstadoCurso } from '../models/estado-curso';
import { ListaCursos } from '../models/listaCurso';
import { Presupuesto } from '../models/presupuesto';
import { TipoCurso } from '../models/tipo-curso';

const cabecera = {
  headers: new HttpHeaders({'Content-Type' : 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class CrearCursoService {
  cursoURL = 'http://localhost:8080/curso'

  constructor(private httpClient: HttpClient) { }

  public guardar(cursoSsave: CursoSave, presupuesto:Presupuesto): Observable<CursoAndPresupuesto> {
    /*let usuarioDto: Usuario = {
      id: undefined,
      correo: 'joooajjsh@ufps.edu.co',
      nombre: 'juan carlos',
      apellido: 'Rojas Rojas',
      roles: []
    }*/
    let cursoAndPresupuestoDto:CursoAndPresupuesto=new CursoAndPresupuesto()
    cursoAndPresupuestoDto.curso=cursoSsave  
    cursoAndPresupuestoDto.presupuesto=presupuesto
    return this.httpClient.post<CursoAndPresupuesto>(this.cursoURL, cursoAndPresupuestoDto, cabecera);
  }
  public buscar(id: number): Observable <ListaCursos> {
    return this.httpClient.get<any>(this.cursoURL + '/' + id, cabecera)
  }
  estado():Observable <EstadoCurso[]>{
    return this.httpClient.get<any>(this.cursoURL + '/estados' , cabecera)
  }
  tipos():Observable <TipoCurso[]>{
    return this.httpClient.get<any>(this.cursoURL + '/tipos' , cabecera)
  }
}
