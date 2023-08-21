import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RegisterDialogComponent } from '../dialogs/register-dialog/register-dialog.component';
import { UserService } from '../services/user.service';
import { UserRole } from '../models/user-role.model';
import { LoginDialogComponent } from '../dialogs/login-dialog/login-dialog.component';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private registerDialogRef: MatDialogRef<any> | undefined;
  private loginDialogRef: MatDialogRef<any>| undefined;
  idNewUserRole!: number;

  constructor(
    private dialogService: MatDialog,
    private userService: UserService,
    private router: Router) {
    
  }

  ngOnInit(): void {
    
  }

  login(){
    this.loginDialogRef = this.dialogService.open(LoginDialogComponent);
    this.loginDialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result){
        this.userService.Login(result).subscribe({
          next: loginResult => {
            if (loginResult.statusCode == 200){
              localStorage.setItem("token", loginResult.data.token);
              localStorage.setItem("user", JSON.stringify(loginResult.data.user));
              localStorage.setItem("role", JSON.stringify(loginResult.data.role));
              localStorage.setItem("inscripciones", JSON.stringify(loginResult.data.inscripciones));
              localStorage.setItem("asignaturas", JSON.stringify(loginResult.data.asignaturas));
              this.router.navigate(['dashboard']);
            }
            console.log(loginResult);
          },
          error: errorResult => {
            this.dialogService.open(ConfirmDialogComponent, {data:errorResult.message});
            console.log(errorResult);
          }
        });
      }
    });
  }

  register(){
    this.registerDialogRef = this.dialogService.open(RegisterDialogComponent);
    this.registerDialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result){
        this.idNewUserRole = result.IdRol;
        let newUser = { ...result };
        delete newUser.IdRol;
        this.userService.createUser(newUser).subscribe({
          next: response => {
            if (response.data){
              let newUserRole :UserRole = {
                IdRol: this.idNewUserRole,
                IdUsuario: response.data.idUsuario
              };
              this.userService.AssignRoleToUser(newUserRole).subscribe({
                next: assignResponse => {
                  console.log(assignResponse);
                },
                error: assignResponse => {
                  console.log(assignResponse);
                }
              });
            }
            console.log(response);
          },
          error: response => {
            console.log(response);
          }
        });
      }
    });
  }
}
