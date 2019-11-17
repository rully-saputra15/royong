import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor(
    public navCtrl: NavController,
    public router: Router
    ) {}

  ngOnInit() {
  }

  timeline() {
    this.router.navigate(['/form']);
  }

}
