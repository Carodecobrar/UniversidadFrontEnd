import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { Role } from '../models/role.model';
import { Router } from '@angular/router';
import { ProgramService } from '../services/program.service';
import { Programa } from '../models/programa.model';
import { UserService } from '../services/user.service';
import { MateriasService } from '../services/materias.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Materia } from '../models/materia.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserDialogComponent } from '../dialogs/user-dialog/user-dialog.component';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user!: any;
  role!: any;
  programa!: any;
  inscripciones!: any[];
  asignaturas!: any[];
  programas!: any[];
  materias!: any[];
  programaForm!: FormGroup;
  columnasTablaProgramas = ['Nombre', 'Créditos', 'Materias'];
  updateDialogRef: MatDialogRef<any> | undefined;
  constructor(
    private router: Router,
    private programService: ProgramService,
    private userService: UserService,
    private materiasService: MateriasService,
    private fb: FormBuilder,
    private dialogService: MatDialog
  ) {
    this.programaForm = this.fb.group({
      idMateria: [""]
    });
  }
  ngOnInit(): void {
    if (localStorage.getItem("token") == null) {
      this.router.navigate(['']);
    }
    this.refreshData();
  }
  refreshData() {
    this.user = JSON.parse(localStorage.getItem("user") + "");
    this.role = JSON.parse(localStorage.getItem("role") + "");
    this.programa = JSON.parse(localStorage.getItem("programa") + "");
    this.inscripciones = JSON.parse(localStorage.getItem("inscripciones") + "");
    this.asignaturas = JSON.parse(localStorage.getItem("asignaturas") + "");
    this.programService.getAllPrograms().subscribe({
      next: result => {
        this.programas = result.data;
        console.log(this.programas);
        this.materiasService.getMateriasByUsuario(this.user.idUsuario).subscribe({
          next: result => {
            this.materias = result.data;
            this.programas.forEach(p => {
              this.materias.forEach(m => {
                if (p.idPrograma == m.idPrograma) {
                  p.creditos += m.creditos;
                }
              });
            });
            console.log(this.materias);
          },
          error: result => {
            console.log(result);
          }
        });
      },
      error: result => {
        console.log(result);
      }
    });
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }
  chooseMateria(row: Materia, element: Programa) {
    this.userService.ChooseMateria(this.user.idUsuario, this.role.idRol, row, element).subscribe({
      next: result => {
        this.dialogService.open(ConfirmDialogComponent, {data:result.message});
        console.log(result);
        this.refreshData();
      },
      error: result => {
        console.log(result);
      }
    });
  }
  showStudents() {
    this.router.navigate(['students']);
  }
  showProfile() {
    this.updateDialogRef = this.dialogService.open(UserDialogComponent);
    this.updateDialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.userService.Update(this.user.idUsuario, result).subscribe(
          {
            next: result => {
              console.log(result);
              this.dialogService.open(ConfirmDialogComponent, {data:result.message});
            },
            error: result => {
              console.log(result);
              this.dialogService.open(ConfirmDialogComponent, {data:result.message});
            }
          });
      }
    });
  }
}
