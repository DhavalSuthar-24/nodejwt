import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {
  loginForm: FormGroup;
  isLoading = false;
  error: string | null = null;
   loginSub!: Subscription;

  constructor(private auth: AuthService, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      usernameOrEmail: ['', [Validators.required, Validators.email]], // Example validation
      password: ['', [Validators.required, Validators.minLength(6)]] // Example validation
    });
  }

  ngOnDestroy() {
    this.loginSub?.unsubscribe();
  }

  onLogin() {
    console.log('ss')
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.error = null;

    this.loginSub = this.auth.login(this.loginForm.value).subscribe(
      (response) => {
        localStorage.setItem('token', response.token);
        this.isLoading = false;
        // Navigate to a protected route or display a success message
      },
      (error) => {
        this.error = 'Login failed: ' + error.message; // Handle error messages
        this.isLoading = false;
      }
    );
  }
}
