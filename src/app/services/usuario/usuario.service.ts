import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { URL_SERVICIOS } from '../../config/config';
import swal from 'sweetalert';
import { SubirarchivoService } from '../subirArchivo/subirarchivo.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any[] = [];

  constructor(public http: HttpClient, public router: Router, public subirArchivoServ: SubirarchivoService) {
    this.cargarStorage();
  }

  estaLogeado() {
    return(this.token.length > 5) ? true : false;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario')) ;
      this.menu = JSON.parse(localStorage.getItem('menu')) ;
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));
    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  logout() {
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');
    this.router.navigate(['./login']);
  }


  loginGoogle(token: string) {
    const url = URL_SERVICIOS + '/login/google';
    return this.http.post(url, {token}).pipe(map((resp: any) => {
      this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
      return true;
    }));
  }

  login( usuario: Usuario, recuerdame: boolean = false) {

    if (recuerdame) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    const url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario)
    .pipe(map((resp: any) => {
      this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
      return true;
    })).pipe(catchError(err =>
      of ( [
        console.log('HTTP Error', err.status),
        swal('Error Login', err.error.mensaje, 'error')
      ])));
  }


 crearUsuario(usuario: Usuario ) {
  const url = URL_SERVICIOS + '/usuario';
  return this.http.post(url, usuario).pipe( map((resp: any) => {
    swal('usuario', 'creado con exito', 'success');
    return resp.usuario;
  })).pipe(catchError(err =>
    of ( [
      console.log('HTTP Error', err.status),
      swal(err.error.mensaje, err.error.errors.message, 'error')
    ])));

 }

 actualizaUsuario(usuario: Usuario) {
  let url = URL_SERVICIOS + '/usuario/' + usuario._id;
  url += '?token=' + this.token;
  console.log(usuario);

  return this.http.put(url, usuario)
  .pipe(map( (resp: any) => {
    if (usuario._id === this.usuario._id) {
      const usuarioDB: Usuario = resp.usuario;
      this.guardarStorage(usuarioDB._id, this.token, usuarioDB, this.menu);
    }
    swal('Usuario Actulaizado', usuario.nombre, 'success');
    return true;
  }));

 }

 // para subir imagen

 cambiarImagen( archivo: File, id: string) {
    this.subirArchivoServ.subirArchivo(archivo, 'usuarios', id )
    .then((resp: any) => {
      this.usuario.img = resp.usuario.img;
      swal('Imagen actualizada', this.usuario.nombre, 'success');
      this.guardarStorage(id, this.token, this.usuario, this.menu);
    })
    .catch( resp => {
      console.log(resp);
    });
 }

 // para listar usuarios
 cargarUsuarios(desde: number = 0) {
   const url = URL_SERVICIOS + '/usuario?desde=' + desde;

   return this.http.get(url);
 }

 buscarUsuario(termino: string) {

  const url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
  return this.http.get(url)
  .pipe(map((resp: any) =>  resp.usuarios ));

}

borrarUsuario(id: string) {
let url = URL_SERVICIOS + '/usuario/' + id;
url += '?token=' + this.token;
return this.http.delete(url).
pipe(map(resp => {
  swal('Usuario eliminado', 'el usuario a sido eliminado correctamente', 'success');
  return true;
}));

}


}
