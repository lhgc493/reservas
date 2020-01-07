import { Component, OnInit } from '@angular/core';
import { Socio } from 'src/app/models/socio';
import { SocioService } from '../../services/index.service';

@Component({
  selector: 'app-socios',
  templateUrl: './socios.component.html',
  styles: []
})
export class SociosComponent implements OnInit {

  socios: Socio[] = [];

  constructor(public socioSer: SocioService) { }

  ngOnInit() {
    this.cargarSocios();
  }

  cargarSocios() {
  this.socioSer.cargarSocios()
  .subscribe(socios => this.socios = socios);
  }

  buscarSocio(termino: string) {
    if(termino.length <= 0){
      this.cargarSocios;
      return
    }

    this.socioSer.buscarSocios(termino).subscribe(socios => this.socios = socios);
  }

  borraSocio(socio: Socio) {

    this.socioSer.borrarSocio(socio._id).subscribe( () => this.cargarSocios());

  }

}
