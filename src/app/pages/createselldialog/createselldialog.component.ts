import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Sell } from 'src/app/models/sell';
import { Subject } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SellService } from 'src/app/services/sell.service';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-createselldialog',
  templateUrl: './createselldialog.component.html',
  styleUrls: ['./createselldialog.component.scss']
})
export class CreateselldialogComponent implements OnInit {
  sellForm: FormGroup;
  routeParams: any;
  sell: Sell;
  sells: Sell;

  loading = false;
  submitted = false; 
  private _unsubscribeAll: Subject<any>;
  constructor(
    public dialogRef: MatDialogRef< CreateselldialogComponent>,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private sellService: SellService,

  ) { }

  ngOnInit(): void {
    this.sellForm = this.formBuilder.group({
      serial_number: ['', Validators.required],
      name: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      //total: ['', Validators.required]
  });

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
    // convenience getter for easy access to form fields
    get f() { return this.sellForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.sellForm.invalid) {
            return;
        }

        this.loading = true;
        this.sellService.add(this.sellForm.value)
            .pipe(first())
            .subscribe(
                data => {
                   // this.alertService.success('Registration successful', true);
                   // this.router.navigate(['/login']);
                  // this.sell.total = this.sell.quantity * this.sell.price
                   this.dialogRef.close();
                },
                error => {
                    //this.alertService.error(error);
                    this.loading = false;
                });
    }
}
