import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MateriasService } from '../services/materias.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  user!: any;
  role!: any;
  inscripciones!: any[];
  asignaturas!: any[];
  programas!: any[];
  estudiantes!: any[];
  columnasTablaEstudiantes = ['Nombre Completo', 'Correo', 'Materias'];
  constructor(
    private router: Router,
    private userService: UserService,
    private materiasService: MateriasService) {
  }

  ngOnInit(): void {
    if (localStorage.getItem("token") == null) {
      this.router.navigate(['']);
    }
    this.user = JSON.parse(localStorage.getItem("user") + "");
    this.role = JSON.parse(localStorage.getItem("role") + "");
    this.inscripciones = JSON.parse(localStorage.getItem("inscripciones") + "");
    this.asignaturas = JSON.parse(localStorage.getItem("asignaturas") + "");
    this.getStudentsData();
  }
  
  logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }
  dashboard(){
    this.router.navigate(['dashboard']);
  }
  getStudentsData(){
    this.userService.GetStudentsData(this.user.idUsuario, this.role.idRol).subscribe({
      next: result => {
        this.estudiantes = result.data;
        console.log(result);
      },
      error: result => {
        console.log(result);
      }
    });
  }
}