import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { LibrosComponent } from './libros/libros.component';
import { InicioComponent } from './inicio';
import { RentarComponent } from './comprar/rentar';
import { NuevolibroComponent } from './nuevolibro/nuevolibro.component';
import { DetallelibroComponent } from './detallelibro/detallelibro.component';
import { AdministrarComponent } from './administrar/administrar.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'Registro', pathMatch: 'full' },
  { path: 'Registro', component: RegistroComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'Libros', component: LibrosComponent },
  { path: 'Inicio', component: InicioComponent },
  { path: 'RentaCompra', component: RentarComponent},
  { path: 'Agregar', component: NuevolibroComponent },
  { path: 'DetalleLibro', component: DetallelibroComponent},
  { path: 'Administrar', component: AdministrarComponent },
  { path: 'Administrar/Perfil', component: ProfileComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UIRoutingModule {}
