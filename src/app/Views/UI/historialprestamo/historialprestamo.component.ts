import { Component, OnInit } from '@angular/core';
import { GetLoginUseCase } from 'src/app/domain/Login/usecase/getLogin';
@Component({
  selector: 'app-historialprestamo',
  templateUrl: './historialprestamo.component.html',
  styleUrls: ['./historialprestamo.component.scss']
})
export class HistorialprestamoComponent implements OnInit {

  constructor(
    private _gateway : GetLoginUseCase
  ) { }

  public Prestamos: any = [];

  async ngOnInit() {
    this.Prestamos = await this._gateway.getHistorialPrestamos().toPromise();
  }

  realizarDevolucion(id: string) {
    this._gateway.realizarDevolucion(id).subscribe((res) => {
      alert("Devolucion realizada con exito");
      this.ngOnInit();
    });
  }

}
