import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppLogoComponent } from '../../components/app-logo/app-logo.component';
import { LoginFormComponent, LoginCredentials } from '../../components/login-form/login-form.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [AppLogoComponent, LoginFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private router: Router, private auth: AuthService) {}

  onLoginSubmit(credentials: LoginCredentials): void {
    this.auth.login(credentials.email, credentials.password).subscribe({
      next: res => {
        if (res.success) {
          this.router.navigate(['/dashboard']);
        }
      },
      error: err => {
        console.error('Login failed:', err);
      }
    });
  }

  onForgotPassword(): void {
    console.log('Forgot password requested');
  }
}
