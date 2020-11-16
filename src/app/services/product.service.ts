import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  dialogData: any;
  constructor(private http: HttpClient) { }
  getAll() {
    return this.http.get<Product[]>(`/product`);
}

add(product: Product) {
  return this.http.post(`/product`, product);
}

delete(id: number) {
    return this.http.delete(`/users/${id}`);
}
updateProduct (product: Product): void {
  this.dialogData = product;
}
updateProducts(product: Product){
  return this.http.put(`/product`, product);
}

}