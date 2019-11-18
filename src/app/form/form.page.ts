import { MainService } from './../main.service';
import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {
  loading : any;
  errorMsg : any;
  ngOnInit() {
  }

  constructor(
    public navCtrl: NavController,
    public router: Router,
    public mainSvc : MainService,
    public loadingCtrl : LoadingController,
    public alertController:AlertController
    ) {}

    signup() {
      this.router.navigate(['/signup']);
    }

    timeline() {
      this.router.navigate(['/timeline']);
    }
    presentSignUpModal(){

    }
    async presentLoading(form:NgForm){
      this.loading = await this.loadingCtrl.create({
        message: 'Authentication',
      });
      await this.loading.present();
      const data_email = form.value.email;
      const data_password = form.value.password;
      let credentials = {
        email: data_email,
        password: data_password
      };
      this.mainSvc.signInWithEmail(credentials)
          .then(
            () => {
              this.loading.dismiss();
              this.router.navigate(['/timeline']);
            },
            error => {
              this.loading.dismiss();
              this.errorMsg = 'Email or password incorrect!';
          }
          );
    }
}
