import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Response } from '../models/response.model';
import { environment } from 'src/environments/environment';
import { UserRole } from '../models/user-role.model';

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
}
