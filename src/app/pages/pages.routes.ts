import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';


// guards
import { LoginGuardGuard } from '../services/index.service';

// import { RolComponent } from './mantenimientos/rol/rol.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { HospedajesComponent } from './hospedajes/hospedajes.component';
import { SociosComponent } from './socios/socios.component';
import { SocioComponent } from './socios/socio.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../services/index.service';




const pagesRoutes: Routes = [

    { path: '',
    component: PagesComponent,
    canActivate: [ LoginGuardGuard ],
    children: [
       { path: 'dashboard', component: DashboardComponent },
       { path: 'grafica1', component: Grafica1Component },
       { path: 'progress', component: ProgressComponent },
       { path: 'rxjs', component: RxjsComponent },
       { path: 'account-setting', component: AccountSettingsComponent },
       { path: 'perfil', component: ProfileComponent, data: {titulo: 'Perfil de usuario'} },
       { path: 'busqueda/:termino', component: BusquedaComponent, data: {titulo: 'Buscador'} },

       // mantenimientos
       { path: 'usuarios',
         component: UsuarioComponent,
         canActivate: [AdminGuard],
         data: {titulo: 'Mantenimiento de usuarios'}},

       { path: 'hospedajes', component: HospedajesComponent, data: {titulo: 'Mantenimiento de hospedajes'}},
       { path: 'socios', component: SociosComponent, data: {titulo: 'Mantenimiento de socios'}},
       { path: 'socio/:id', component: SocioComponent, data: {titulo: 'Actualizacion de socios'}},
       { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
      ]
    },

];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
