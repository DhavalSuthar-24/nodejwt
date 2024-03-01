import { Injectable } from '@angular/core';
import { HttpClient ,HttpErrorResponse,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {  throwError } from 'rxjs';
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
@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private apiUrl = 'http://localhost:2000/signup'; // Corrected the string syntax

  constructor(private http: HttpClient) {}

  signup(data: SignupData): Observable<any> {
    return this.http.post(this.apiUrl, data)
      .pipe(
        map(response => response), // Process response if needed
        tap(() => console.log('Signup successful')), // Log success (optional)
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // Backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`
      );
    }
    // Return an observable with a user-facing error message.
    return throwError('Something went wrong; please try again later.');
  }
}
