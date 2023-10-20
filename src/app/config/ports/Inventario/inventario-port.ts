import { Observable } from "rxjs";

export abstract class InventarioPorts {

  abstract getInventario(): Observable<any>;

  abstract postInventario(Inventario: any | []): Observable<any>;

  abstract deleteInventario(InventarioID: string): Observable<any>;

  abstract putInventario(Inventario: any | [], id_Inventario: any): Observable<any>;

  abstract getInventarioID(InventarioID: string): Observable<any>;

}
