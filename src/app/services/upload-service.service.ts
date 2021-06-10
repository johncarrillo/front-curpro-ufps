import { HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const cabecera = {
  headers: new HttpHeaders({'Content-Type' : 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class UploadServiceService {

  dependenciaURL = 'http://localhost:8080/uploadImage'
  constructor(private httpClient: HttpClient) { }


  public guardar(files:File):Observable<HttpEvent<any>> {
    let formData: FormData=new FormData()
    formData.append('files', files)
    const req= new HttpRequest('POST', `${this.dependenciaURL}`, formData)
    return this.httpClient.request(req)
  }

  public buscar(fileName: string): Observable <any> {
    return this.httpClient.get<any>(this.dependenciaURL + '/' + fileName, cabecera)
  }
}
