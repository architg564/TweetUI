import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LoginService, Credentials } from '../../services/login.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, Router } from '@angular/router'; // Import Router
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterLink, MatIconModule,NgxSpinnerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  
  constructor(
    private loginService: LoginService,
    private spinner: NgxSpinnerService,
    private router: Router // Inject Router
  ) {}
  
  ngOnInit(): void {}
  
  hide: boolean = true;
  credentials = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(12),
    ]),
  });

  public get username() {
    return this.credentials.get('username');
  }
  public get password() {
    return this.credentials.get('password');
  }

  onSubmit(): void {
    this.spinner.show();

    // Map the form values to the Credentials type
    const credentials: Credentials = {
      username: this.credentials.value.username || '', // Ensure non-null value
      password: this.credentials.value.password || ''  // Ensure non-null value
    };

    this.loginService.getToken(credentials).subscribe(
      (response: any) => {
        localStorage.setItem('username', credentials.username);
        localStorage.setItem('token', response.token);
        this.spinner.hide();
        this.router.navigate(['/home']); // Use Angular's Router for navigation
      },
      (error) => {
        console.error(error);
        this.spinner.hide();
        alert('Invalid credentials');
      }
    );
  }
}