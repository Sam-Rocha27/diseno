import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DashboardComponent } from './webadmin/dashboard/dashboard.component';
import { NavbarComponent } from './webadmin/dashboard/navbar/navbar.component';
import { SidebarComponent } from './webadmin/dashboard/sidebar/sidebar.component';
import { ErroresComponent } from './webapp/errores/errores.component';
import { InicioComponent } from './webapp/inicio/inicio.component';
import { PerfilComponent } from './webadmin/dashboard/perfil/perfil.component';
import { ConfiguracionComponent } from './webadmin/dashboard/configuracion/configuracion.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { NavbarLComponent } from './webapp/navbar-l/navbar-l.component';
import { ModelosComponent } from './webadmin/dashboard/modelos/modelos.component';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { VentasComponent } from './webadmin/dashboard/ventas/ventas.component';
import { ArticulosComponent } from './webadmin/dashboard/articulos/articulos.component';
import { ProveedoresComponent } from './webadmin/dashboard/proveedores/proveedores.component';
import { ClientesComponent } from './webadmin/dashboard/clientes/clientes.component';
import { ArticulosService } from './webadmin/service/articulos.service';
import { ProveedoresService } from './webadmin/service/proveedores.service';
import { ClientesService } from './webadmin/service/clientes.service';
import { VentasService } from './webadmin/service/ventas.service';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    ArticulosComponent,
    ClientesComponent,
    VentasComponent,
    ProveedoresComponent,
    NavbarComponent,
    SidebarComponent,
    ErroresComponent,
    InicioComponent,
    PerfilComponent,
    ConfiguracionComponent,
    NavbarLComponent, 
    ModelosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FormsModule,

  ],
  providers: [
    AngularFirestore,
    ArticulosService,
    ProveedoresService,
    ClientesService,
    VentasService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
