import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
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

  constructor(private auth: AuthService, private fb: FormBuilder, private r:Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]], // Example validation
      password: ['', [Validators.required, Validators.minLength(6)]] // Example validation
    });
  }

  ngOnDestroy() {
    this.loginSub?.unsubscribe();
  }

  onLogin() {
    console.log("mioww")
    if (this.loginForm.invalid) {
      return;
    }
  
    this.isLoading = true;
    this.error = null;
  console.log(this.loginForm.value)
    this.loginSub = this.auth.login(this.loginForm.value).subscribe(
      (response) => {
        localStorage.setItem('token', response.token);
        this.isLoading = false;
        this.r.navigate(['/dash'])
        // Navigate to a protected route or display a success message
      },
      (error) => {
        this.isLoading = false;
        this.error = 'Login failed: ' + (error.error?.message || error.message); // Handle error messages
      }
    );
  }
  
}
