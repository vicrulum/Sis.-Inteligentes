import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CreateproductdialogComponent} from 'src/app/pages/createproductdialog/createproductdialog.component'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { EditproductdialogComponent } from '../editproductdialog/editproductdialog.component';
import { CreateselldialogComponent } from '../createselldialog/createselldialog.component';
import { Sell } from 'src/app/models/sell';
import { SellService } from 'src/app/services/sell.service';
@Component({
  selector: 'app-sells',
  templateUrl: './sells.component.html',
  styleUrls: ['./sells.component.scss']
})
export class SellsComponent implements OnInit {
  sellsForm: FormGroup;
  loading = false;
  submitted = false;
  name: string;
  dataSource: any;
  sell: Sell

  sells: Sell[] = [];

  displayedColumns: string[] = ['No', 'Nombre', 'Precio', 'Inventario', "Total" ];
  constructor(    
    public dialog: MatDialog,
    private sellService: SellService,
    private _changeDetector: ChangeDetectorRef) { }
    headElements = ['ID', 'First', 'Last', 'Handle'];

    ngOnInit(): void {
      this.loadAllSells();
     
  
    }
  
    private loadAllSells() {
      this.sellService.getAll().pipe(first()).subscribe(sells => {
          this.sells = sells;
          this.dataSource = this.sells;
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
}
