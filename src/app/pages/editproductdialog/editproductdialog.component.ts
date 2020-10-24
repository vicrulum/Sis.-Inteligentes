import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-editproductdialog',
  templateUrl: './editproductdialog.component.html',
  styleUrls: ['./editproductdialog.component.scss']
})
export class EditproductdialogComponent {

  constructor(public dialogRef: MatDialogRef<EditproductdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
     public productService: ProductService) { }

formControl = new FormControl('', [
Validators.required
// Validators.email,
]);

getErrorMessage() {
return this.formControl.hasError('required') ? 'Required field' :
this.formControl.hasError('email') ? 'Not a valid email' :
'';
}
  ngOnInit(): void {
  }
  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  stopEdit(): void {
    this.productService.updateProduct(this.data);
  }
}
