import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
import swal from 'sweetalert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  constructor(public usuService: UsuarioService) {
    this.usuario = this.usuService.usuario;
  }

  usuario: Usuario;


  // para pre visualizar imagen a subir

  imagenSubir: File;
  imagenTemp: string | ArrayBuffer;

  ngOnInit() {

  }



  guardar(usuario: Usuario) {
  this.usuario.nombre = usuario.nombre;
  if (!this.usuario.google) { // si no es de google podemos actualizar el email
  this.usuario.email = usuario.email;
  }
  this.usuService.actualizaUsuario(this.usuario)
  .subscribe();

  }

  seleccionImagen(archivo: File ) {
    if (!archivo) {
      this.imagenSubir =  null;
      return;
    }

    if (archivo.type.indexOf('image') < 0) {
      swal('Solo imagenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }


    this.imagenSubir =  archivo;

    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL( archivo);

    reader.onloadend = () => this.imagenTemp  = reader.result;



  }

  cambiarImagen() {

    this.usuService.cambiarImagen(this.imagenSubir, this.usuario._id);
  }

}
