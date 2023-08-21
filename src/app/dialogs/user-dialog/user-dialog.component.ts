import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Login } from 'src/app/models/login.model';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent {
  userForm!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder) {
    this.userForm = this.fb.group({
      email: ["", [Validators.required]],
      contraseña: ["", [Validators.required]]
    });
  }

  update() {
    if (this.userForm.valid) {
      let newUpdate : Login = {
        Correo: this.userForm.get('email')!.value,
        Clave: this.userForm.get('contraseña')!.value
      };
      this.dialogRef.close(newUpdate);
    } else {
      Object.keys(this.userForm.controls).forEach(key => {
        if (this.userForm.get(key) != null) {
          if (!this.userForm.get(key)?.valid)
            this.userForm.get(key)!.markAsTouched();
        }
      });
    }
  }
}
