import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { URL_SERVICIOS } from 'src/app/config/config';
import { UsuarioService } from 'src/app/services/index.service';
import swal from 'sweetalert';
import { Hospedaje } from 'src/app/models/hospedaje';

@Injectable({
  providedIn: 'root'

})
export class HospedajeService {

  totalHospedajes: number = 0;

  constructor(public http: HttpClient, public usuService: UsuarioService) { }

  cargarHospedajes() {
    const url = URL_SERVICIOS + '/hospedaje';

    return this.http.get(url)
    .pipe(map((resp: any) => {
      // tslint:disable-next-line: no-unused-expression
      this.totalHospedajes = resp.total;
      return resp.hospedaje;

    }));
  }

  obtenerHospedaje(id: string) {
const url = URL_SERVICIOS + '/hospedaje/' + id;
return this.http.get(url)
.pipe(map((resp: any) => resp.hospedaje));
  }

  borraHospedaje(id: string) {
    let url = URL_SERVICIOS + '/hospedaje/' + id;
    url += '?token=' + this.usuService.token;
    return this.http.delete(url)
    .pipe(map(resp => swal('Hospedaje Borrado', 'Eliminado correctamente', 'success')));
  }

  crearHospedaje(nombre: string) {
    let url = URL_SERVICIOS + '/hospedaje/';
    url += '?token=' + this.usuService.token;
    return this.http.post(url, {nombre})
    .pipe(map((resp: any) => resp.hospedaje));
  }

  buscarHospedaje(termino: string) {

    const url = URL_SERVICIOS + '/busqueda/coleccion/hospedajes/' + termino;
    return this.http.get(url)
    .pipe(map((resp: any) => resp.hospedajes));

  }

  actualizaHospedaje(hospedaje: Hospedaje) {
  let url = URL_SERVICIOS + '/hospedaje/' + hospedaje._id;
  url += '?token=' + this.usuService.token;
  return this.http.put(url, hospedaje)
  .pipe(map((resp: any) => {
    swal('Hospedaje actualizado', hospedaje.nombre, 'success');
  } ));
  }

}
