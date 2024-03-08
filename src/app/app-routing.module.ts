import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { DashComponent } from './dash/dash.component';
const routes: Routes = [{
  path:'',
  component:SignupComponent
},{
  path:'login',
  component:LoginComponent

},{
  path:'dash',
  component:DashComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
