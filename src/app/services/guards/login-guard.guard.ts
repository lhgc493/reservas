import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';



@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor( public usuarioService: UsuarioService, public router: Router) {}

  canActivate() {

    console.log('paso por el loginguad');

    if (this.usuarioService.estaLogeado()) {
      console.log('paso el guard');
      return true;
    } else {
      console.log('Esta bloqueado por el guard');
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
