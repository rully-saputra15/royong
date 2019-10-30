import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { WelcomePage } from '../welcome/welcome.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public router: Router
    ) {}

    welcome() {
      this.router.navigate(['/welcome']);
    }

}
