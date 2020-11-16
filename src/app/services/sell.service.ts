import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Sell } from 'src/app/models/sell';

@Injectable({
  providedIn: 'root'
})
export class SellService {
  dialogData: any;
  constructor(private http: HttpClient) { }
  getAll() {
    return this.http.get<Sell[]>(`/ventas`);
}

addSell(sell: Sell) {
  return this.http.post(`/ventas`, sell);
}

delete(id: number) {
    return this.http.delete(`/ventas/${id}`);
}
updateProduct (sell: Sell): void {
  this.dialogData = sell;
}
}
