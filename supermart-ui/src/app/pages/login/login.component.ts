import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppLogoComponent } from '../../components/app-logo/app-logo.component';
import { LoginFormComponent, LoginCredentials } from '../../components/login-form/login-form.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [AppLogoComponent, LoginFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private router: Router) {}

  onLoginSubmit(credentials: LoginCredentials): void {
    // TODO: integrate with authentication service
    console.log('Login attempted with:', credentials.email);
    this.router.navigate(['/dashboard']);
  }

  onForgotPassword(): void {
    // TODO: navigate to forgot-password page
    console.log('Forgot password requested');
  }
}
