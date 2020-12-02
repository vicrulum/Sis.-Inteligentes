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
import { Supplier } from 'src/app/models/supplier';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-createsupplierdialog',
  templateUrl: './createsupplierdialog.component.html',
  styleUrls: ['./createsupplierdialog.component.scss']
})
export class CreatesupplierdialogComponent implements OnInit {

  supplierForm: FormGroup;
  routeParams: any;
  supplier: Supplier;
  suppliers: Supplier;
  currentUser: User;
  currentUserSubscription: Subscription;

  loading = false;
  submitted = false; 
  constructor(
    public dialogRef: MatDialogRef<CreatesupplierdialogComponent>,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private supplierService: SupplierService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
        this.currentUser = user;
    });
    }


  ngOnInit(): void {
    this.supplierForm = this.formBuilder.group({
      id:      [''],
      name:    [''],
      email:   [''],
      phone:   [''],
      address: ['']
  });
  }
    // convenience getter for easy access to form fields
    get f() { return this.supplierForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.supplierForm.invalid) {
            return;
        }
        this.supplierForm.value.initialValue = this.supplierForm.value.quantity
        this.loading = true;
        console.log("supplierForm",this.supplierForm.value)
        this.supplierService.add(this.supplierForm.value)
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
    onNoClick(): void {
      this.dialogRef.close();
    }
}
