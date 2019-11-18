import { MainService } from './../../../main.service';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MapModalComponent } from '../../map-modal/map-modal.component';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.scss'],
})
export class LocationPickerComponent implements OnInit {

  constructor(private modalCtrl: ModalController,private http: HttpClient,private mainSvc : MainService) { }

  ngOnInit() {}
  async onPickLocation(){
    const modal = await this.modalCtrl.create({
      component: MapModalComponent
    });
    modal.onDidDismiss().then((modalData) => {
      this.mainSvc.setLatLng(modalData.data.lat,modalData.data.lng);
      this.getAddress(modalData.data.lat,modalData.data.lng).subscribe(
        (address) => {
          this.mainSvc.setAddress(address);
        }
      );
    });
    return await modal.present();
  }
  private getAddress(Lat: number,Lng : number){
    return this.http.get<any>(`https://api.opencagedata.com/geocode/v1/json?key=0d3b0b05ff8b4b8780db802cf2c21cf6&q=${Lat}+${Lng}&pretty=1`)
    .pipe(
      map(geoData => {
        if(!geoData || !geoData.results || !geoData.results.length){
          return null;
        }
        return geoData.results[0].formatted;
      })
    );
  }
}
