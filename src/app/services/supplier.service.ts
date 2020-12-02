import { Injectable } from '@angular/core';
import { Supplier } from '../models/supplier';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  dialogData: any;
  constructor(private http: HttpClient) { }
  getAll() {
    return this.http.get<Supplier[]>(`/supplier`);
}

add(supplier: Supplier) {
  return this.http.post(`/supplier`, supplier);
}

updateSupplier (suppliers: Supplier): void {
  this.dialogData = suppliers;
}
updateSuppliers(supplier: Supplier){
  return this.http.put(`/supplier`, supplier);
}
}
