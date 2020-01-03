import { Component, OnInit, OnDestroy } from '@angular/core';
import { retry, map, filter} from 'rxjs/operators';
// tslint:disable-next-line: import-blacklist

import { Observable, Subscriber, Subscription  } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subcription: Subscription;

  constructor() {


    this.subcription = this.regresaObservable()
    .subscribe(
      numero => console.log('subs', numero),
      error => console.error('Error en el obs', error),
      () => console.log('El observador termino')
    );

   }


  ngOnInit() {
  }

  ngOnDestroy(){
    console.log('la pagina se va a cerrar');
    this.subcription.unsubscribe();
  }

  regresaObservable(): Observable<any> {

    return new Observable((observer: Subscriber < any >)  => {
      let contador = 0;

      const intervalo = setInterval(() => {
        contador += 1;

        const salida = {
          valor: contador
        };


        observer.next(salida);
      // if (contador === 3) {
      //    clearInterval(intervalo);
       //   observer.complete();
       // }
       // if (contador === 2) {
       //   clearInterval(intervalo);
       //   observer.error('Esto ya valio verga');
       // }
      }, 1000);
    }).pipe(
      map(resp => resp.valor ),
        filter( (valor, index) => {
          // console.log('filter', valor, index);
          if ( (valor % 2) === 1) {
            // impar
              return true;
            } else {
              // par
              return false;
            }


        })
    );

  }

}
