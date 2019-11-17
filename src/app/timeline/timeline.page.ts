import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.page.html',
  styleUrls: ['./timeline.page.scss'],
})
export class TimelinePage implements OnInit {

  public isSearchbarOpened = false;

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
    this.isSearchbarOpened = false;
  }

  onSearch(event){
    console.log(event.target.value);
  }

}
