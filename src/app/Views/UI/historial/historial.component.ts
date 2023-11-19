import { Component, OnInit } from '@angular/core';
import { GetLoginUseCase } from 'src/app/domain/Login/usecase/getLogin';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})
export class HistorialComponent implements OnInit {


  constructor(
    private _gateway : GetLoginUseCase
  ) { }

  public Devoluciones: any = [];

  async ngOnInit() {
    this.Devoluciones = await this._gateway.getHistorialDevoluciones().toPromise();
  }

}
