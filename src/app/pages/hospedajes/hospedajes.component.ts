import { Component, OnInit } from '@angular/core';
import { Hospedaje } from '../../models/hospedaje';
import { HospedajeService } from 'src/app/services/index.service';
import { ModaluploadService } from '../../components/modalupload/modalupload.service';


declare var swal: any;

@Component({
  selector: 'app-hospedajes',
  templateUrl: './hospedajes.component.html',
  styles: []
})
export class HospedajesComponent implements OnInit {

  hospedajes: Hospedaje[] = [];

  constructor(public hospedajeSer: HospedajeService, public modalService: ModaluploadService) { }

  ngOnInit() {
    this.cargarHospedajes();
    this.modalService.notificacion
    .subscribe(() => this.cargarHospedajes());
  }

  cargarHospedajes() {
    this.hospedajeSer.cargarHospedajes().subscribe(hospedajes => this.hospedajes = hospedajes);
  }

  guardarHospedaje(hospedaje: Hospedaje) {

    this.hospedajeSer.actualizaHospedaje(hospedaje)
    .subscribe();
  }

  borraHospedaje(hospedaje: Hospedaje) {
    this.hospedajeSer.borraHospedaje(hospedaje._id)
    .subscribe( () => this.cargarHospedajes());

  }

  buscarHospedaje(termino: string) {
  if (termino.length <= 0) {
    // tslint:disable-next-line: no-unused-expression
    this.cargarHospedajes;
    return;
  }

  this.hospedajeSer.buscarHospedaje(termino)
    .subscribe(hospedajes => this.hospedajes = hospedajes);
  }

  crearHospedaje(){

    swal({
      title: 'Crear Hospedaje',
      text: 'Ingrese el nombre del Hospedaje',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    }).then((valor: string) =>{
      if(!valor || valor.length === 0) {
        return;
      }
      this.hospedajeSer.crearHospedaje(valor)
      .subscribe(() => this.cargarHospedajes());
    });

  }

  actualizarImagen(hospedaje: Hospedaje) {
    this.modalService.mostrarMOdal('hospedajes', hospedaje._id);
  }

}
