import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { SignupComponent } from './signup/signup.component';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
