import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-administrar',
  templateUrl: './administrar.component.html',
  styleUrls: ['./administrar.component.scss'],
})
export class AdministrarComponent implements OnInit {
  ngOnInit(): void {}

  showProfileOptions = false;

  zindex = 10;
  isShowing = false;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngAfterViewInit() {
    const expandHome =
      this.elementRef.nativeElement.querySelector('.expandHome');
    const subHome: any = this.elementRef.nativeElement.querySelector('.sub-home');
    const subnavbtn: any = this.elementRef.nativeElement.querySelector('.subnavbtn');
    const trapezoid: any = this.elementRef.nativeElement.querySelector('#trapezoid');

    this.renderer.listen(expandHome, 'mouseover', () => {
      this.renderer.setStyle(subHome, 'display', 'block');
    });

    this.renderer.listen(subnavbtn, 'mouseover', () => {
      this.renderer.setStyle(subHome, 'display', 'none');
    });

    this.renderer.listen(trapezoid, 'mouseleave', () => {
      this.renderer.setStyle(trapezoid, 'margin-top', '-53px');
      this.renderer.setStyle(subHome, 'display', 'none');
    });

    this.renderer.listen(trapezoid, 'mouseenter', () => {
      this.renderer.setStyle(trapezoid, 'margin-top', '0px');
    });
  }


  public Mostrar_Perfil: boolean = false;
  public Mostrar_PerfilDatos: boolean = false;
  public Mostrar_HistorialPrestamo: boolean = false;
  public Mostrar_Usuarios: boolean = false;

  MostrarPerfil() {
    this.OcultarTodos();
    this.Mostrar_Perfil = !this.Mostrar_Perfil;
  }

  MostrarPerfilDatos() {
    this.OcultarTodos();
    this.Mostrar_PerfilDatos = !this.Mostrar_PerfilDatos;
  }

  MostrarHistorialPrestamo() {
    this.OcultarTodos();
    this.Mostrar_HistorialPrestamo = !this.Mostrar_HistorialPrestamo;
  }

  MostrarUsuarios() {
    this.OcultarTodos();
    this.Mostrar_Usuarios = !this.Mostrar_Usuarios;
  }

  OcultarTodos() {
    this.Mostrar_Perfil = false;
    this.Mostrar_HistorialPrestamo = false;
    this.Mostrar_PerfilDatos = false;
    this.Mostrar_Usuarios = false;
  }

}
