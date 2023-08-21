import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Response } from '../models/response.model';
import { environment } from 'src/environments/environment';
import { UserRole } from '../models/user-role.model';
import { Login } from '../models/login.model';
import { Programa } from '../models/programa.model';
import { RequestParams } from '../models/request-params.model';
import { Materia } from '../models/materia.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  controller = `${environment.api}/Usuarios/`;
  constructor(private http: HttpClient) { }

  createUser(user: User) {
    return this.http.post<Response<any>>(this.controller,user);
  }
  AssignRoleToUser(newUserRole: UserRole) {
    return this.http.post<Response<User>>(this.controller+'assignRole',newUserRole);
  }
  Login(login: Login) {
    return this.http.post<Response<any>>(this.controller+'login',login);
  }
  ChooseMateria(idusuario:number, idRole:number, materia:Materia, programa: Programa) {
    let params : RequestParams = {
      IdUsuario: idusuario,
      IdRol: idRole,
      Materia: materia,
      Programa: programa
    };
    return this.http.post<Response<User>>(this.controller+'chooseMateria',params);
  }
}
