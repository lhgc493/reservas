import { NgModule } from '@angular/core';
import { PAGES_ROUTES } from './pages.routes';
import { SharedModule } from '../shared/shared.module';


// ng2-charts

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';

// Pipe Module
import { PipesModule } from '../pipes/pipes.module';
import { IncrementadorComponent } from '../reutilizables/incrementador/incrementador.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'; import { FormsModule } from '@angular/forms';
import { UsuarioComponent } from './usuario/usuario.component';
import { HospedajesComponent } from './hospedajes/hospedajes.component';
import { ModaluploadComponent } from '../components/modalupload/modalupload.component';




@NgModule ({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Grafica1Component,
        IncrementadorComponent,
        AccountSettingsComponent,
        RxjsComponent,
        ProfileComponent,
        UsuarioComponent,
        HospedajesComponent,
        ModaluploadComponent
    
    
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Grafica1Component,

    ],
    imports: [
        CommonModule,
        HttpClientModule,
        SharedModule,
        PAGES_ROUTES,       
        FormsModule,
        
       
        PipesModule

    ]
})

export class PagesModule { }
