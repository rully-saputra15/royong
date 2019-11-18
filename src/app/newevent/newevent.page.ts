import { AlertController } from '@ionic/angular';
import { MainService } from './../main.service';
import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import * as firebase from 'firebase';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-newevent',
  templateUrl: './newevent.page.html',
  styleUrls: ['./newevent.page.scss'],
})
export class NeweventPage implements OnInit {
  captureDataUrl : any ;
  address = '';
  lat = '';
  lng = '';
  user : firebase.User;
  userId : any;
  downloadURL : any;
  tanggal : any;
  nama : any;
  constructor(public mainSvc : MainService,
              public alertCtrl : AlertController) { }

  ngOnInit() {
    this.mainSvc.getAddress().subscribe((currAddress) => {
      this.address = currAddress;
    });
    this.mainSvc.getLat().subscribe((currLat)=>{
      this.lat = currLat;
    });
    this.mainSvc.getLng().subscribe((currLng)=>{
      this.lng = currLng;
    });
    this.user = this.mainSvc.getUserId();
    this.userId = this.user.uid;
  }
  timeline(){
    
  }
  
  takePhoto(){
    const cameraOptions: CameraOptions = {
      quality: 30,
      destinationType: Camera.DestinationType.DATA_URL,
      encodingType: Camera.EncodingType.JPEG,
      mediaType: Camera.MediaType.PICTURE,
    }
    Camera.getPicture(cameraOptions)
    .then((imageData) => {
      this.captureDataUrl = 'data:image/jpeg;base64,'+imageData;
    },(err) => {
    });
  }
  onSubmit(form : NgForm){
    this.nama = form.value.nama;
    this.tanggal = form.value.tanggal;
    console.log(this.tanggal);
    let storageRef = firebase.storage().ref();
    const filename = this.nama;
    //const filePath = 'images/events/'+this.nama;
    const imageRef = storageRef.child(`images/events/${filename}.jpg`);
    //const task:AngularFireUploadTask = this.afStorage.upload(filePath,this.captureDataUrl);
    

    imageRef.putString(this.captureDataUrl,firebase.storage.StringFormat.DATA_URL)
    .then((snapshot) =>{
      imageRef.getDownloadURL().then((data)=>{
        this.downloadURL = data;
        console.log(this.downloadURL);
        let record = {};
        record['nama'] = this.nama;
        record['tanggal'] = this.tanggal;
        record['eid'] = this.userId;
        record['lat'] = this.lat;
        record['lng'] = this.lng;
        record['url'] = this.downloadURL;
        this.mainSvc.addDataEvent(record);
      })
      this.showSuccesfulUploadAlert();
    });
  }
  async showSuccesfulUploadAlert() {
    let alert = this.alertCtrl.create({
      header: 'Uploaded!',
      subHeader: 'Picture is uploaded to Firebase',
      buttons: ['OK']
    });
    (await alert).present();

    // clear the previous photo data in the variable

  }
}
