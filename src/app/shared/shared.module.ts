import { environment } from './../../environments/environment';
import { IonicModule } from '@ionic/angular';
import { MapModalComponent } from './map-modal/map-modal.component';
import { LocationPickerComponent } from './pickers/location-picker/location-picker.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [LocationPickerComponent,MapModalComponent],
  imports: [
    CommonModule,IonicModule,
  ],
  exports: [LocationPickerComponent,MapModalComponent],
  entryComponents : [MapModalComponent]
})
export class SharedModule { }
