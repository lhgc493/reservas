import { Component, OnInit, Inject } from '@angular/core';
import {  DOCUMENT } from '@angular/common'; // para tener acceso al Documento


@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  // tslint:disable-next-line: variable-name
  constructor( @Inject(DOCUMENT) private _document )  { }



ngOnInit() {
  }

cambiarColor(tema: string, link: any) {
    console.log(tema);

    this.cambiarCheck(link);
    const url = `assets/css/colors/${ tema }.css`;
    this._document.getElementById('tema').setAttribute('href', url);
  }

cambiarCheck(link: any) {
  const selectores: any = document.getElementsByClassName('selector');
  for (const ref of selectores) {
    ref.classList.remove('working');
  }
  link.classList.add('working');
}
}
