import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss']
})
export class RegisterDialogComponent {
  registerForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<RegisterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private fb: FormBuilder) {
      this.registerForm = this.fb.group({
        cedula:["", [Validators.required]],
        nombres:["", [Validators.required]],
        apellidos:["", [Validators.required]],
        fechaNacimiento:["", [Validators.required]],
        sexo:["", [Validators.required]],
        email:["", [Validators.required]],
        contraseña:["", [Validators.required]],
        idRol:["", [Validators.required]],
      });
  }

  createUser(){
    if (this.registerForm.valid){
      let newUser : User = {
        Cedula: this.registerForm.get('cedula')!.value + '',
        Nombres: this.registerForm.get('nombres')!.value,
        Apellidos: this.registerForm.get('apellidos')!.value,
        FechaDeNacimientoText: this.registerForm.get('fechaNacimiento')!.value,
        FechaNacimiento: this.registerForm.get('fechaNacimiento')!.value,
        Sexo: this.registerForm.get('sexo')!.value,
        Correo: this.registerForm.get('email')!.value,
        Clave: this.registerForm.get('contraseña')!.value,
        IdRol: parseInt(this.registerForm.get('idRol')!.value),
        NombreCompleto: ''
      };
      this.dialogRef.close(newUser);
    } else{
      Object.keys(this.registerForm.controls).forEach(key => {
        if (this.registerForm.get(key) != null){
          if (!this.registerForm.get(key)?.valid)
            this.registerForm.get(key)!.markAsTouched();
        }
      });
    }
  }
}
