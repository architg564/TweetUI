import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterLink, NgxSpinnerModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  constructor(private loginService: LoginService, private spinner: NgxSpinnerService, private router: Router) { }

  ngOnInit(): void { }

  hide:boolean = true;

  credentials = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(12),
    ]),
    number: new FormControl('', [
      Validators.required,
      Validators.min(1000000000),
      Validators.max(9999999999),
      // Validators.pattern('/^[1-9][0-9]*$/'),
    ]),
  });
  public get firstName() {
    return this.credentials.get('firstName');
  }
  public get lastName() {
    return this.credentials.get('lastName');
  }
  public get username() {
    return this.credentials.get('username');
  }
  public get password() {
    return this.credentials.get('password');
  }
  public get number() {
    return this.credentials.get('number');
  }

  onSubmit() {
    this.spinner.show();
    this.loginService.registerUser(this.credentials.value).subscribe(
      (response: any) => {
        this.spinner.hide();
        this.router.navigate(['/']);
      },
      (error) => {
        console.error(error);
        this.spinner.hide();
      }
    );
  }
}