import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


// rutas

import { APP_ROUTES } from './app.routes';

// modulos

import { PagesModule } from './pages/pages.module';

// temporal

// import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// servicios
import { ServiceModule } from './services/service.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import {  ReactiveFormsModule, FormsModule } from '@angular/forms';

// import { ImagenPipe } from './pipes/imagen.pipe'; para q no se llene de pipes





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    
    // ImagenPipe
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PagesModule,
    FormsModule,
    ReactiveFormsModule, // para trabajar en registro de usuarios
    ServiceModule
    
   

  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
