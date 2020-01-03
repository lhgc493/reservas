import { Component, OnInit } from '@angular/core';

import { UsuarioService } from '../../services/index.service';
import { Usuario } from 'src/app/models/usuario.model';
// import swal from 'sweetalert';
import { ModaluploadService } from '../../components/modalupload/modalupload.service';


declare var swal: any; // para que se pueda compilar


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: []
})
export class UsuarioComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(public usuService: UsuarioService, public modalService: ModaluploadService) { }

  ngOnInit() {
    this.cargandoUsuarios();
    this.modalService.notificacion.subscribe(resp => this.cargandoUsuarios());
  }

  mostrarModal(id: string) {
    this.modalService.mostrarMOdal('usuarios', id);
  }

  cargandoUsuarios() {

    this.cargando = true;

    this.usuService.cargarUsuarios(this.desde)
    .subscribe((resp: any) => {

     //  console.log(resp);
      this.totalRegistros = resp.total;
      this.usuarios = resp.Usuario;
      console.log(this.usuarios);
      this.cargando = false;

    });
  }
  // paginacion
  cambiarDesde(valor: number) {
    const desde = this.desde + valor;
    if (desde >= this.totalRegistros) {
      return;
    }
    if (desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargandoUsuarios();

  }

  buscarUsuario(termino: string) {

    if (termino.length <= 0) {
      this.cargandoUsuarios();
      return;
    }
    this.cargando = true;
    console.log(termino);
    this.usuService.buscarUsuario(termino)
    .subscribe((usuarios: Usuario[]) => {
      console.log(usuarios);
      this.usuarios = usuarios;
      this.cargando = false;
    });
  }

  borraUsuario(usuario: Usuario) {
   if (usuario._id === this.usuService.usuario._id) {
     swal('No puede borrar usuario', 'No puede borrarse usted mismo', 'error');
     return;
   }

   swal({
    title: 'Estas seguro?',
    text: 'Esta a punto de eliminar a ' + usuario.nombre,
    icon: 'warning',
    buttons: true,
    dangerMode: true,
  })
  .then((borrar) => {
    console.log(borrar);
    if (borrar) {
       this.usuService.borrarUsuario(usuario._id)
       .subscribe(borrado => {
        console.log(borrado);
        this.cargandoUsuarios();
       });
    }
  });

  }

  guardarUsuario(usuario: Usuario) {
    this.usuService.actualizaUsuario(usuario)
    .subscribe();
  }



}
