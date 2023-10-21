import { NgModule } from '@angular/core';
import { UIRoutingModule } from './UI-routing.module';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu';
import { FormsModule } from '@angular/forms';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { LibrosComponent } from './libros/libros.component';
import { RentarComponent } from './comprar/rentar/rentar.component';
import { FooterComponent } from './footer/footer.component';
import { AddLibroComponent } from './addlibro/addlibro.component';
import { NuevolibroComponent } from './nuevolibro/nuevolibro.component';
import { DetallelibroComponent } from './detallelibro/detallelibro.component';
import { HistorialprestamoComponent } from './historialprestamo/historialprestamo.component';
import { AdministrarComponent } from './administrar/administrar.component';
import { ProfileComponent } from './profile/profile.component';
import { HistorialComponent } from './historial/historial.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { PerfilComponent } from './perfil/perfil.component';

@NgModule({
  imports: [
    CommonModule,
    UIRoutingModule,
    FormsModule
  ],
  declarations: [
    InicioComponent,
    LibrosComponent,
    RentarComponent,
    AddLibroComponent,
    NuevolibroComponent,
    DetallelibroComponent,
    HistorialprestamoComponent,
    AdministrarComponent,
    ProfileComponent,
    HistorialComponent,
    UsuariosComponent,
    PerfilComponent,
  ]
})
export class UIModule { }
