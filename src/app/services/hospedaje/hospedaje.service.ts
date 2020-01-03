import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../../../../admipro-udemy-2.2.0/src/app/config/config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HospedajeService {

  totalHospitales: number = 0;

  constructor(public http: HttpClient) { }

  cargarHospedajes() {



    const url = URL_SERVICIOS + '/hospedaje';

    return this.http.get(url)
    .pipe(map((resp: any) => {
      // tslint:disable-next-line: no-unused-expression
      this.totalHospitales = resp.total;
      return resp.hospedajes;

    }));
  }

}
