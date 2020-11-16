import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CreateproductdialogComponent} from 'src/app/pages/createproductdialog/createproductdialog.component'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { EditproductdialogComponent } from '../editproductdialog/editproductdialog.component';
import { CreateselldialogComponent } from '../createselldialog/createselldialog.component';
import { Sell } from 'src/app/models/sell';
import { SellService } from 'src/app/services/sell.service';
import { AlertService } from 'src/app/services/alert.service';
@Component({
  selector: 'app-sells',
  templateUrl: './sells.component.html',
  styleUrls: ['./sells.component.scss']
})
export class SellsComponent implements OnInit {
  productForm = new FormControl();
  products: Product[] = [];
  productList = [] ;
  selectedProduct: Product;
//Dropdown
  total;
  sellsForm: FormGroup;
  loading = false;
  submitted = false;
  name: string;
  dataSource: any;
  sellList: any;
  sell: Sell

  sells: Sell[] = [];
  newQuantity :any;
 

  displayedColumns: string[] = ['No', 'Nombre', 'Precio', 'Inventario', "Total" ];
  constructor(    
    public dialog: MatDialog,
    private sellService: SellService,
    private _changeDetector: ChangeDetectorRef,
    private productService: ProductService,
    private alertService: AlertService) { }
    headElements = ['ID', 'First', 'Last', 'Handle'];

    ngOnInit(): void {
      this.loadAllProducts()
      this.loadAllSells();
      
     // console.log(this.sells)
      //console.log(this.dataSource)
      //console.log(this.productList)
    }
    private loadAllProducts() {
      this.productService.getAll().pipe(first()).subscribe(products => {
          this.products = products;
          this.productList = this.products;
          console.log(this.productList)
      });
    }
    private loadAllSells() {
      this.sellService.getAll().pipe(first()).subscribe(sells => {
          this.sells = sells;
          this.dataSource = this.sells;
          console.log("Allsells",)
          
      });
    }
  openDialog(): void {
    const dialogRef = this.dialog.open(CreateselldialogComponent, {
      width: '250px',

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
    this._changeDetector.detectChanges();
  }
  SelectedProducts(selectedProduct){
   // console.log("selected",selectedProduct)
    this.total = 0
    for (let i = 0; i < selectedProduct.length; i++) {
      //console.log("price",parseInt(selectedProduct[i].price))
      this.newQuantity = parseInt( selectedProduct[i].quantity) -1
      var initialQuantity = this.selectedProduct[i].initialValue / 2;
      console.log("initialQUantity",initialQuantity)
      if(this.newQuantity < initialQuantity){
        console.log("EL inventario del producto:", this.selectedProduct[i].name ," ha disminuido a menos de la mitad, se enviara un correo al proveedor")
      }
      this.total= this.total + parseInt(selectedProduct[i].price);
      selectedProduct[i].quantity = this.newQuantity
      console.log("quantity", selectedProduct[i].quantity )
    }
    
    this.sellList = selectedProduct;
    console.log("sellList",this.sellList)
 /*   this.productService.updateProducts(this.sellList)
    .pipe(first())
    .subscribe(
        data => {
            this.alertService.success('Producto Actualizado', true);
            console.log("Producto Actualizado")
            //this.router.navigate(['/login']);
        },
        error => {
            this.alertService.error(error);
            //this.loading = false;
        });*/
    /*this.sellService.addSell(this.sellList)
    .pipe(first())
    .subscribe(
        data => {
            this.alertService.success('Venta exitosa', true);
            console.log("Venta Exitosa")
            //this.router.navigate(['/login']);
        },
        error => {
            this.alertService.error(error);
            //this.loading = false;
        });

*/
  }
  


}
