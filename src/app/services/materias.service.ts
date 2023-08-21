import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Response } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {
  controller = `${environment.api}/Materias/`;
  constructor(private http: HttpClient) { }

  getMateriasByUsuario(idUsuario:number) {
    return this.http.get<Response<any>>(this.controller+'getMateriasByUsuario?idUsuario='+idUsuario);
  }
}
