import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import { SubirarchivoService } from '../../../../../proyecto/src/app/services/subirArchivo/subirarchivo.service';
import { ModaluploadService } from './modalupload.service';
import { SubirArchivoService } from '../../../../../admipro-udemy-2.2.0/src/app/services/subir-archivo/subir-archivo.service';

@Component({
  selector: 'app-modalupload',
  templateUrl: './modalupload.component.html',
  styleUrls: ['./modalupload.component.css']
})
export class ModaluploadComponent implements OnInit {


  imagenSubir: File;
  imagenTemp: string | ArrayBuffer;

  constructor(public subirArchivoSer: SubirarchivoService, public modalService: ModaluploadService) {

   }

  ngOnInit() {
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

  subirImagen() {
  this.subirArchivoSer.subirArchivo(this.imagenSubir, this.modalService.tipo, this.modalService.id)
  .then(resp => {
    this.modalService.notificacion.emit(resp);
    this.cerrarModal();
  })
  .catch(err => {
    console.log('error cargando imagenes')
  });
  }

  cerrarModal() {
    this.imagenTemp = null;
    this.imagenSubir = null;
    this.modalService.ocultarModal();
  }

}
