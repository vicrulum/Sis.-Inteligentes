import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { first } from 'rxjs/operators';
import { SettingsService } from 'src/app/services/settings.service';
import { Settings } from 'src/app/models/setting';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  settingForm: FormGroup;
  settings : Settings[]= [];
  loading = false;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService,
    private settingService: SettingsService
  ) {
 
   }

  ngOnInit(): void {
    this.getSettings()
    this.settingForm = this.formBuilder.group({
      email: [''],
      minNumProducts: [''],
      username: [''],
      
  });
  }
    // convenience getter for easy access to form fields
    get f() { return this.settingForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.settingForm.invalid) {
            return;
        }

        this.loading = true;
        this.settingService.setting(this.settingForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Configuracion exitosa', true);
                    this.router.navigate(['/home']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
    getSettings(){
      this.settingService.getSettings().pipe(first()).subscribe(settings => {
       console.log(settings)
        this.settings = settings
    });
    }
}
