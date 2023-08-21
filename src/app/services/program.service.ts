import { Injectable } from '@angular/core';
import { Response } from '../models/response.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {
  controller = `${environment.api}/Programas/`;
  constructor(private http: HttpClient) { }

  getAllPrograms() {
    return this.http.get<Response<any>>(this.controller);
  }
}
