import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/index.service';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  constructor( 
    public usuarioService: UsuarioService,
    public router: Router
     ) { }

  usuario: Usuario;

  ngOnInit() {
    this.usuario = this.usuarioService.usuario;
  }

  buscar(termino: string) {
  this.router.navigate(['/busqueda', termino]);
  }

}
