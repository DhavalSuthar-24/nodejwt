import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

// Define an interface for login credentials
interface LoginCredentials {
  
  username: string;
  password: string; // Required for login
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:2000/login'; // Replace with your actual backend API endpoint

  constructor(private http: HttpClient) {}

  // Method to handle user login
  login(credentials: LoginCredentials): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Make an HTTP POST request to the login endpoint with provided credentials
    return this.http.post<any>(this.apiUrl, credentials, { headers }).pipe(
      tap(response => {
        // Log the response for debugging (optional)
        console.log('Login response:', response);
        
        // Handle successful login (if needed)
        // Example: Store authentication token in local storage
        localStorage.setItem('token', response.token);
      }),
      catchError(this.handleError) // Handle errors
    );
  }

  // Method to handle errors during HTTP requests
  private handleError(error: HttpErrorResponse): Observable<any> {
    // Log the error for debugging
    console.error('Login error:', error);

    // Handle specific backend errors (if applicable)
    if (error.error && error.error.message) {
      // Return an observable with the specific error message from the backend
      return throwError(error.error.message);
    }

    // Generic error message for security
    return throwError('Something went wrong; please try again later.');
  }
}
