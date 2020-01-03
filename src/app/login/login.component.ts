import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/index.service';

declare function init_plugins();
declare const gapi: any; // declaramos esta libreria para usasr google sign in





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 recuerdame: boolean = false;
 email: string;

 auth2: any; // para google


  constructor(private router: Router, private usuarioService: UsuarioService) {

   }

  ngOnInit() {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email' || ' ');
    if ( this.email.length > 1 ) {
      this.recuerdame = true;
    }

  }
  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '209416225567-jqocbo2n0ng96p12vg12svdeb2d33ptl.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('btnGoogle'));

    });
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
     // const profile = googleUser.getBasicProfile();
     const token = googleUser.getAuthResponse().id_token;
     this.usuarioService.loginGoogle(token).subscribe( () => window.location.href = '#/dashboard'
     ); // para que al ser redireccionado cargue bien la pg

    });
  }

  ingresar(form: NgForm) {

    if (form.invalid) {
      return;
    }

    const usuario = new Usuario(null, form.value.email, form.value.password );

    this.usuarioService.login(usuario, form.value.recuerdame)
    .subscribe(resp => {
     this.router.navigate(['/dashboard']);
    });



  }
}
