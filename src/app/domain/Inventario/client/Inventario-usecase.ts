import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InventarioPorts } from 'src/app/config/ports/Inventario/inventario-port';

@Injectable({
  providedIn: 'root'
})

export class InventarioUseCase {

  constructor(private inventarioGateway: InventarioPorts){}

  public getInventario(): Observable<any>{
    return this.inventarioGateway.getInventario();
  }

  public getInventarioById(id: string): Observable<any>{
    return this.inventarioGateway.getInventarioID(id);
  }

  public createInventario(inventario: any): Observable<any>{
    return this.inventarioGateway.postInventario(inventario);
  }

  public updateInventario(inventario: any, id_inventario: any ): Observable<any>{
    return this.inventarioGateway.putInventario(inventario, id_inventario );
  }

  public deleteInventario(id: string): Observable<any>{
    return this.inventarioGateway.deleteInventario(id);
  }

}
