import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CreateproductdialogComponent} from 'src/app/pages/createproductdialog/createproductdialog.component'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  productForm: FormGroup;
  loading = false;
  submitted = false;
  animal: string;
  name: string;

  products: Product[] = [];

  ELEMENT_DATA: Product[] = [
    {serial_number: 1,  name: 'Hydrogen', price: 1.0079, quantity: 1},
    {serial_number: 2,  name: 'Helium', price: 4.0026, quantity: 2},
    {serial_number: 3,  name: 'Lithium', price: 6.941, quantity: 3},
    {serial_number: 4,  name: 'Beryllium', price: 9.0122, quantity: 4},
    {serial_number: 5,  name: 'Boron', price: 10.811, quantity: 5},
    {serial_number: 6,  name: 'Carbon', price: 12.0107, quantity: 6},
    {serial_number: 7,  name: 'Nitrogen', price: 14.0067, quantity: 5},
    {serial_number: 8,  name: 'Oxygen', price: 15.9994, quantity: 2},
    {serial_number: 9,  name: 'Fluorine', price: 18.9984, quantity: 1},
    {serial_number: 10,  name: 'Neon', price: 20.1797, quantity: 3},
  ];

  displayedColumns: string[] = ['No', 'Nombre', 'Precio', 'Inventario'];
  dataSource = this.ELEMENT_DATA;
  elements: any = [
    {id: 1, first: 'Mark', last: 'Otto', handle: '@mdo'},
    {id: 2, first: 'Jacob', last: 'Thornton', handle: '@fat'},
    {id: 3, first: 'Larry', last: 'the Bird', handle: '@twitter'},
  ];

  headElements = ['ID', 'First', 'Last', 'Handle'];
  constructor(
    public dialog: MatDialog,
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.loadAllProducts();

  }

  private loadAllProducts() {
    this.productService.getAll().pipe(first()).subscribe(products => {
        this.products = products;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateproductdialogComponent, {
      width: '250px',
      data: {name: this.name}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.name = result;
    });
  }

}



