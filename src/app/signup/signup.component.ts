import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupService } from '../service/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'] // Corrected property name
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private signupService: SignupService) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      profilePic: [''] // No need for Validators for file input
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      const formData = new FormData();
      formData.append('firstName', this.signupForm.value.firstName);
      formData.append('lastName', this.signupForm.value.lastName);
      formData.append('username', this.signupForm.value.username);
      formData.append('email', this.signupForm.value.email);
      formData.append('password', this.signupForm.value.password);
      formData.append('profilePic', this.signupForm.value.profilePic);

      // Now you can submit formData to your backend API using SignupService or any other method
      // Example:
      // this.signupService.signup(formData).subscribe(response => {
      //   console.log(response);
      // });

      // For demonstration purposes, you can log formData
      console.log(formData);
    } else {
      // Form is invalid, display error messages or handle accordingly
    }
  }
}
