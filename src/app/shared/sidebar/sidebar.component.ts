import { Component, OnInit } from '@angular/core';
import { SidebarService, UsuarioService } from '../../services/index.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'

})
export class SidebarComponent implements OnInit {

  constructor(
    public sidebar: SidebarService,
    public usuarioService: UsuarioService
  ) { }

  usuario: Usuario;

  ngOnInit() {
    this.usuario = this.usuarioService.usuario;
  }

}
