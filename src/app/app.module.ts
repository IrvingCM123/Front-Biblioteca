import { CuentasAdapter } from './config/adapters/Formularios/formularios-adapter';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireAuthModule  } from '@angular/fire/compat/auth';
import { FirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { CommonModule } from '@angular/common';

import { RegistroComponent } from './Views/UI/registro/registro.component';
import { LoginComponent } from './Views/UI/login/login.component';

import { CuentasPort } from './config/ports/Formularios/formulario-ports';

import { LoginPort } from './config/ports/Login/login-ports';
import { LoginAdapter } from './config/adapters/Login/login-adapter';
import { MenuComponent } from './Views';
import { FooterComponent } from './Views/UI/footer/footer.component';
import { LibroPort } from './config/ports/Libros/Libros-port';
import { LibroAdapter } from './config/adapters/Libros/Libros-adapter';
import { RevistaPort } from './config/ports/Revista/Revista-ports';
import { InfoCatPort } from './config/ports/InfoCatalogo/InfoCatalogo-ports';
import { InfoCatAdapter } from './config/adapters/InfoCatalogo/InfoCatalogo-adapter';
import { RevistaAdapter } from './config/adapters/Revistas/revista-adapter';
import { InventarioPorts } from './config/ports/Inventario/inventario-port';
import { InventarioAdapter } from './config/adapters/Inventario/inventario-adapter';
import { RegistroPort } from './config/ports/Registro/Registro-ports';
import { RegistroAdapter } from './config/adapters/Registro/Registro-adapter';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    RegistroComponent,
    LoginComponent,
    FooterComponent,
  ],
  imports: [
    AngularFireAuthModule,
    FirestoreModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    CommonModule,
  ],
  providers: [
    {provide: CuentasPort, useClass: CuentasAdapter},
    {provide: LoginPort, useClass: LoginAdapter},
    {provide: LibroPort, useClass: LibroAdapter },
    {provide: RevistaPort, useClass: RevistaAdapter },
    {provide: InfoCatPort, useClass: InfoCatAdapter },
    {provide: InventarioPorts, useClass: InventarioAdapter},
    {provide: RegistroPort, useClass: RegistroAdapter }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
