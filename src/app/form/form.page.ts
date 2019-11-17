import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {

  ngOnInit() {
  }

  constructor(
    public navCtrl: NavController,
    public router: Router
    ) {}

    timeline() {
      this.router.navigate(['/timeline']);
    }

}
