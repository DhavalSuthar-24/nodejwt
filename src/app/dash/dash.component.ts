import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrl: './dash.component.css'
})
export class DashComponent {
  constructor(private router: Router) { }

  onLogout() {
    localStorage.removeItem('token'); // Remove the token from local storage
    // Perform any additional logout actions if needed
    this.router.navigate(['/login']); // Navigate to the login page or any other desired page
  }
}
