import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Supplier } from 'src/app/models/supplier';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupplierService } from 'src/app/services/supplier.service';
import { MatDialog } from '@angular/material/dialog';
import { CreatesupplierdialogComponent } from '../createsupplierdialog/createsupplierdialog.component';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss']
})
export class SuppliersComponent implements OnInit {
  supplierForm: FormGroup;
  loading = false;
  submitted = false;
  name: string;
  dataSource: any;
  supplier: Supplier

  suppliers: Supplier[] = [];

  displayedColumns: string[] = ['Nombre', 'Email', 'Telefono', 'Direccion'];
  
  headElements = ['ID', 'First', 'Last', 'Handle'];
  constructor(
    public dialog: MatDialog,
    private suppliersService: SupplierService,
    private _changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadAllProducts();

  }

  private loadAllProducts() {
    this.suppliersService.getAll().pipe(first()).subscribe(suppliers => {
        this.suppliers = suppliers;
        this.dataSource = this.suppliers;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreatesupplierdialogComponent, {
      width: '250px',
      data: {name: this.name}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.name = result;
    });
    this._changeDetector.detectChanges();
  }



}
