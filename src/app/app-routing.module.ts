import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './webadmin/dashboard/dashboard.component';
import { ErroresComponent } from './webapp/errores/errores.component';
import { PerfilComponent } from './webadmin/dashboard/perfil/perfil.component';
import { ConfiguracionComponent } from './webadmin/dashboard/configuracion/configuracion.component';
import { InicioComponent } from './webapp/inicio/inicio.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ArticulosComponent } from './webadmin/dashboard/articulos/articulos.component';
import { ClientesComponent } from './webadmin/dashboard/clientes/clientes.component';
import { VentasComponent } from './webadmin/dashboard/ventas/ventas.component';
import { ProveedoresComponent } from './webadmin/dashboard/proveedores/proveedores.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },


  {
    path: 'dashboard', component: DashboardComponent, children: [
      { path: '', redirectTo: 'dashboard/articulos', pathMatch: 'full' },
      { path: 'articulos', component: ArticulosComponent },
      { path: 'clientes', component: ClientesComponent },
      { path: 'ventas', component: VentasComponent },
      { path: 'proveedores', component: ProveedoresComponent },
      { path: 'perfil', component: PerfilComponent },
      { path: 'configuracion', component: ConfiguracionComponent }

    ]
  },
  { path: '**', component: ErroresComponent },
  { path: 'login', loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule) },
  { path: 'register', loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterModule) },
 


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
