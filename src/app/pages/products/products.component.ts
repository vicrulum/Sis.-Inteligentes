import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  ELEMENT_DATA: Product[] = [
    {num: 1, nombre: 'Hydrogen', precio: 1.0079, inventario: 'H'},
    {num: 2, nombre: 'Helium', precio: 4.0026, inventario: 'He'},
    {num: 3, nombre: 'Lithium', precio: 6.941, inventario: 'Li'},
    {num: 4, nombre: 'Beryllium', precio: 9.0122, inventario: 'Be'},
    {num: 5, nombre: 'Boron', precio: 10.811, inventario: 'B'},
    {num: 6, nombre: 'Carbon', precio: 12.0107, inventario: 'C'},
    {num: 7, nombre: 'Nitrogen', precio: 14.0067, inventario: 'N'},
    {num: 8, nombre: 'Oxygen', precio: 15.9994, inventario: 'O'},
    {num: 9, nombre: 'Fluorine', precio: 18.9984, inventario: 'F'},
    {num: 10, nombre: 'Neon', precio: 20.1797, inventario: 'Ne'},
  ];

  displayedColumns: string[] = ['No', 'Nombre', 'Precio', 'Inventario'];
  dataSource = this.ELEMENT_DATA;
  elements: any = [
    {id: 1, first: 'Mark', last: 'Otto', handle: '@mdo'},
    {id: 2, first: 'Jacob', last: 'Thornton', handle: '@fat'},
    {id: 3, first: 'Larry', last: 'the Bird', handle: '@twitter'},
  ];

  headElements = ['ID', 'First', 'Last', 'Handle'];
  constructor() { }

  ngOnInit(): void {
  }

}
