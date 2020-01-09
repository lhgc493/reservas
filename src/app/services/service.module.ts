import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModaluploadService } from '../components/modalupload/modalupload.service';





// servicios centralizados en este modulo
import {
  SettingsService,
  SidebarService,
  SharedService,
  UsuarioService,
  SubirarchivoService,
  HospedajeService,
  SocioService,
  AdminGuard,
  LoginGuardGuard

} from './index.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
   SettingsService,
   SidebarService,
   SharedService,
   UsuarioService,
   SubirarchivoService,
   HospedajeService,
   ModaluploadService,
   SocioService,
   AdminGuard,
   LoginGuardGuard
  ]
})
export class ServiceModule { }
