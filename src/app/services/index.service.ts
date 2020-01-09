


// todos los servicios los concentramos aqui y los exportamos
// para que solo tengan una unica referencia 'services/service.index
export { SettingsService } from './settings/settings.service';
export { SharedService } from './shared/shared.service';
export { SidebarService } from './shared/sidebar.service';
// guards
export { AdminGuard } from './guards/admin.guard';
export { LoginGuardGuard } from './guards/login-guard.guard';

export { SocioService } from './socio/socio.service';
export { HospedajeService } from './hospedaje/hospedaje.service';
export { UsuarioService } from './usuario/usuario.service';
export {SubirarchivoService} from './subirArchivo/subirarchivo.service';
