import { Injectable } from '@angular/core';
import { UsuarioService } from '../index.service';


@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: any[] = [];
  constructor(public usuService: UsuarioService) {
   
  }
  cargarMenu () {
    this.menu = this.usuService.menu;
  }
}








 /* menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Dasboard', url: '/dashboard' },
        { titulo: 'Progress', url: '/progress' },
        { titulo: 'Graficas', url: '/grafica1' },
        { titulo: 'Rxjs', url: '/rxjs' }
      ]
    },
    {
      titulo: 'Mantenimientos ',
      icono: 'mdi mdi-wrench',
      submenu: [
        { titulo: 'Usuarios', url: '/usuarios' },
        { titulo: 'Hospedajes', url: '/hospedajes' },
        { titulo: 'Socios', url: '/socios' },

      ]
    },

  ];*/


