import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RegisterDialogComponent } from '../dialogs/register-dialog/register-dialog.component';
import { UserService } from '../services/user.service';
import { UserRole } from '../models/user-role.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private registerDialogRef: MatDialogRef<any> | undefined;
  idNewUserRole!: number;

  constructor(
    private dialogService: MatDialog,
    private userService: UserService) {
    
  }

  ngOnInit(): void {
    
  }

  login(){

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
