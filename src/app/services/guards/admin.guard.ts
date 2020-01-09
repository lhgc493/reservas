import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../../services/index.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(public usuService: UsuarioService) {}

  canActivate() {
   if (this.usuService.usuario.role === 'ADMIN_ROLE') {
     return true;
   } else {
     console.log('Bloqueado por el adminGuard');
     this.usuService.logout();
     return false;
   }

  }

}
