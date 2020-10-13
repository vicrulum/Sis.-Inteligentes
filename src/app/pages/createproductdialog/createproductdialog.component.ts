import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, FormGroupDirective, NgForm, FormControl, Validators, FormArray } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Subscription } from 'rxjs';

import { first } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product.service';
export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-createproductdialog',
  templateUrl: './createproductdialog.component.html',
  styleUrls: ['./createproductdialog.component.scss']
})
export class CreateproductdialogComponent implements OnInit {
  productname: string;
  productprice: string;

  productForm: FormGroup;
  routeParams: any;
  product: Product;
  products: Product;
  currentUser: User;
  currentUserSubscription: Subscription;

  loading = false;
  submitted = false; 
  private _unsubscribeAll: Subject<any>;
  

  constructor(
    public dialogRef: MatDialogRef<CreateproductdialogComponent>,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
        this.currentUser = user;
    });
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
  

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      serial_number: ['', Validators.required],
      name: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required]
  });
  }
    // convenience getter for easy access to form fields
    get f() { return this.productForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.productForm.invalid) {
            return;
        }

        this.loading = true;
        this.productService.add(this.productForm.value)
            .pipe(first())
            .subscribe(
                data => {
                   // this.alertService.success('Registration successful', true);
                   // this.router.navigate(['/login']);
                   this.dialogRef.close();
                },
                error => {
                    //this.alertService.error(error);
                    this.loading = false;
                });
    }
}
