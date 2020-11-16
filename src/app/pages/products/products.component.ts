import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CreateproductdialogComponent} from 'src/app/pages/createproductdialog/createproductdialog.component'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { EditproductdialogComponent } from '../editproductdialog/editproductdialog.component';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  productForm: FormGroup;
  loading = false;
  submitted = false;
  name: string;
  dataSource: any;
  product: Product

  products: Product[] = [];

  displayedColumns: string[] = ['No', 'Nombre', 'Precio', 'Inventario', 'actions'];
  
  headElements = ['ID', 'First', 'Last', 'Handle'];
  constructor(
    public dialog: MatDialog,
    private productService: ProductService,
    private _changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadAllProducts();

  }

  private loadAllProducts() {
    this.productService.getAll().pipe(first()).subscribe(products => {
        this.products = products;
        this.dataSource = this.products;
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
    this._changeDetector.detectChanges();
  }

  startEdit(i: number, product, mes) {
    console.log("i:",i)
    console.log("product:",product)
    console.log("name", mes)
    product.serial_number = i;
    // index row is used just for debugging proposes and can be removed
  

    const dialogRef = this.dialog.open(EditproductdialogComponent, {
      data: {id: product.id, name: product.name, price: product.price, quantity: product.quantity}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
       // const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
        // Then you update that record using data from dialogData (values you enetered)
       // this.exampleDatabase.dataChange.value[foundIndex] = this.dataService.getDialogData();
        // And lastly refresh table
        //this.refreshTable();
      }
    });
  }

  newQuantity(newQuantity){
    console.log("newQ",newQuantity)

  }
}



