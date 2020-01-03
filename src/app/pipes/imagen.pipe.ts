import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {



    // imagenes sin google
    let url = URL_SERVICIOS + '/img' ;

    if (!img) {
      return url + '/usuarios/imagenpordefecto';
    }
    if ( img.indexOf('https') >= 0) {
      return img;
    }

    switch (tipo) {
    case 'usuario':
      url += '/usuarios/' + img;
      break;

    case 'socio':
        url += '/socios/' + img;
        break;

    case 'hospedaje':
        url += '/hospedajes/' + img;
        break;

        default:
          console.log('No son imagenes de usuarios, socios o medicos');
          url += 'usuarios/imagenpordefecto';
    }


    return url;
  }

}
