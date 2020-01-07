import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospedaje } from 'src/app/models/hospedaje';
import { SocioService } from 'src/app/services/index.service';
import { HospedajeService } from 'src/app/services/index.service';
import { Socio } from '../../models/socio';
import { Router, ActivatedRoute } from '@angular/router';
import { ModaluploadService } from 'src/app/components/modalupload/modalupload.service';



@Component({
  selector: 'app-socio',
  templateUrl: './socio.component.html',
  styles: []
})
export class SocioComponent implements OnInit {

  hospedajes: Hospedaje[] = [];
  // tslint:disable-next-line: max-line-length
  socio: Socio = new Socio('', '', '', '', '');  // la variable esta inicializada y en el CB no salga vacio y se iguale a las comillas vacias
  hospedaje: Hospedaje = new Hospedaje('');

  constructor(
    public socioSer: SocioService,
    public hospService: HospedajeService,
    public router: Router,
    public activatedRouter: ActivatedRoute,
    public modalSer: ModaluploadService
    ) {
      activatedRouter.params.subscribe( params => {
      const id = params.id;
      if (id !== 'nuevo') {
        this.mostrarSocio(id);
      }
      });
    }

  ngOnInit() {
    this.hospService.cargarHospedajes()
    .subscribe(hospedajes => this.hospedajes = hospedajes);

    this.modalSer.notificacion
    .subscribe(resp => {
      console.log(resp);
      this.socio.img = resp.socio.img;
    })

  }

  mostrarSocio(id: string)  {
    this.socioSer.mostrarSocio(id)
    .subscribe(socio => {
      this.socio = socio;
      this.socio.hospedaje = socio.hospedaje._id;
      this.cambioHospedaje(this.socio.hospedaje);
    } );
  }

  guardarSocio(f: NgForm) {
      console.log(f.valid);
      console.log(f.value);

      if (f.invalid) {
        return;
      }

      this.socioSer.guardarSocio(this.socio)
      .subscribe(socio => {
        this.socio._id = socio._id;
        this.router.navigate(['/socio', socio._id]);
      });

  }

  cambioHospedaje( id: string) {
    this.hospService.obtenerHospedaje(id)
    .subscribe(hospedaje => this.hospedaje = hospedaje);
  }
  cambiarFoto() {
    this.modalSer.mostrarMOdal('socios', this.socio._id);
  }

}
