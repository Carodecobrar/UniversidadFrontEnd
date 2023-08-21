import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Login } from 'src/app/models/login.model';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent {
  loginForm!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required]],
      contraseña: ["", [Validators.required]]
    });
  }

  login() {
    if (this.loginForm.valid) {
      let newLogin : Login = {
        Correo: this.loginForm.get('email')!.value,
        Clave: this.loginForm.get('contraseña')!.value
      };
      this.dialogRef.close(newLogin);
    } else {
      Object.keys(this.loginForm.controls).forEach(key => {
        if (this.loginForm.get(key) != null) {
          if (!this.loginForm.get(key)?.valid)
            this.loginForm.get(key)!.markAsTouched();
        }
      });
    }
  }
}
