import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: any = [
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

  ];

  constructor() { }
}
