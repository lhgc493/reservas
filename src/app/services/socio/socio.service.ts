import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../index.service';
import swal from 'sweetalert';
import { Socio } from '../../models/socio';


@Injectable({
  providedIn: 'root'
})
export class SocioService {

  totalSocios: number = 0;

  constructor(public http: HttpClient, public usuSer: UsuarioService) { }

  mostrarSocio(id: string) {
const url = URL_SERVICIOS + '/socio/' + id;
return this.http.get(url)
.pipe(map((resp: any) => resp.socio));
  }

  cargarSocios() {
    const url = URL_SERVICIOS + '/socio';
    return this.http.get(url).
    pipe(map((resp: any) => {
      this.totalSocios = resp.total;
      return resp.socio;
    }));
  }
  buscarSocios(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/socios/' + termino;
    return this.http.get(url)
    .pipe(map((resp: any) => resp.socios));
  }


  borrarSocio(id: string) {
    let url = URL_SERVICIOS + '/socio/' + id;
    url += '?token=' + this.usuSer.token;
    return this.http.delete(url)
    .pipe(map(resp => {
      swal('Socio borrado', 'El socio se borro correctamente', 'success');
    }));
  }

  guardarSocio(socio: Socio) {
    let url = URL_SERVICIOS + '/socio';


    if (socio._id) {
      // actualizar
      url += '/' + socio._id;
      url += '?token=' + this.usuSer.token;

      return this.http.put(url, socio)
      .pipe(map((resp: any) => {
        swal('Socio Actualizado', socio.nombre, 'success');
        return resp.socio;
      }))

    } else {
      // crea socio
      url += '?token=' + this.usuSer.token;

      return this.http.post(url, socio)
      .pipe(map((resp: any) => {
        swal('Socio creado', socio.nombre, 'success');
        return resp.socio;
      }));

    }


  }

}
