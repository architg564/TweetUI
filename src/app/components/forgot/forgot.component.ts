import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-forgot',
  standalone: true,
  imports: [CommonModule, MatCardModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, RouterLink, NgxSpinnerModule],
  templateUrl: './forgot.component.html',
  styleUrl: './forgot.component.css'
})
export class ForgotComponent implements OnInit {

  constructor(private loginService: LoginService, private spinner: NgxSpinnerService, private router: Router) { }

  ngOnInit(): void { }

  hide:boolean = true;
  hide2:boolean = true;
  hide3:boolean = true;

  credentials = new FormGroup({
    userId: new FormControl('', [Validators.required, Validators.email]),
    number: new FormControl('', [
      Validators.required,
      Validators.min(1000000000),
      Validators.max(9999999999),
    ]),
    old_password: new FormControl('', [
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(12),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(12),
    ]),
  });
  public get userId() {
    return this.credentials.get('userId');
  }
  public get number() {
    return this.credentials.get('number');
  }
  public get old_password(){
    return this.credentials.get('old_password');
  }
  public get password() {
    return this.credentials.get('password');
  }
  public get confirmPassword() {
    return this.credentials.get('confirmPassword');
  }
  onSubmit() {
    if (
      this.credentials.value.password != this.credentials.value.confirmPassword
    ) {
      alert('password mismatch');
    } else {
      this.spinner.show();
      this.loginService
        .forgotPassword(
          this.credentials.value.userId!,
          this.credentials.value.old_password!,
          this.credentials.value.password!
        )
        .subscribe({
          next: (response) => {
            alert('password changed!');
            this.spinner.hide();
            this.router.navigate(['/']);
          },
          error: (error) => {
            this.spinner.hide();
            alert('You entered wrong password. TRY AGAIN!');
            console.error(error);
          }
        });
    }
  }

  passwordMismatch(): boolean {

    if (
      this.credentials.value.password != this.credentials.value.confirmPassword
    ) {
      return true;
    }
    return false;
  }

  
}