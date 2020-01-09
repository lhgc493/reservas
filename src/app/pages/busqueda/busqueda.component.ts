import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Usuario } from 'src/app/models/usuario.model';
import { Socio } from '../../models/socio';
import { Hospedaje } from 'src/app/models/hospedaje';


@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[] = [];
  socios: Socio[] = [];
  hospedajes: Hospedaje[] = [];

  constructor(
    public activatedrouter: ActivatedRoute,
    public http: HttpClient
    ) {
    activatedrouter.params.subscribe(params => {
      const termino = params.termino;
      this.buscar(termino);
    });
   }

  ngOnInit() {
  }

  buscar(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/todo/' + termino;
    this.http.get(url)
    .subscribe((resp: any) => {
      console.log(resp);
      this.usuarios = resp.usuarios;
      this.socios = resp.socios;
      this.hospedajes = resp.hospedajes;
    });

  }

}
