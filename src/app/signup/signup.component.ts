import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupService } from '../service/signup.service';
interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  // Optional fields:
  profilePic?: string;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  isLoading = false; // Boolean flag to indicate loading state

  constructor(private fb: FormBuilder, private signupService: SignupService) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      profilePic: [''] // Include profilePic in the form group
    });
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      console.error('Form is invalid');
      return; // Prevent submission if form is invalid
    }
  
    this.isLoading = true; // Set loading state to true
  
    const formData = new FormData();
    formData.append('firstName', this.signupForm.value.firstName);
    formData.append('lastName', this.signupForm.value.lastName);
    formData.append('email', this.signupForm.value.email);
    formData.append('username', this.signupForm.value.username);
    formData.append('password', this.signupForm.value.password);
  
    // Append profilePic if provided
    const profilePic = this.signupForm.get('profilePic')?.value;
    if (profilePic) {
      formData.append('profilePic', profilePic, profilePic.name); // Include filename
    }
  
    // Create a new object of type SignupData from the FormData object
    const signupData: SignupData = {
      firstName: this.signupForm.value.firstName,
      lastName: this.signupForm.value.lastName,
      email: this.signupForm.value.email,
      username: this.signupForm.value.username,
      password: this.signupForm.value.password,
      profilePic: profilePic ? profilePic.name : undefined // Include profilePic if provided
    };
  
    // Call signupService.signup with the new object of type SignupData
    this.signupService.signup(signupData).subscribe(
      (response) => {
        this.isLoading = false; // Reset loading state
        console.log('User signed up successfully:', response);
        // Handle successful signup response (e.g., navigate to another page, show confirmation message)
      },
      (error) => {
        this.isLoading = false; // Reset loading state
        console.error('Error occurred while signing up:', error);
        // Handle error and display user-friendly message if needed
      }
    );
  }
  
}
