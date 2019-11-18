import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { BehaviorSubject } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  private user:firebase.User;
  private userId : string;
  currAddress = new BehaviorSubject<string>('');
  latAddress = new BehaviorSubject<string>('');
  lngAddress = new BehaviorSubject<string>('');
  constructor(public afAuth: AngularFireAuth,public firestore: AngularFirestore) { 
    afAuth.authState.subscribe(user => {
      this.user = user;
    });
  }
  getAddress(){
    return this.currAddress.asObservable();
  }
  getLat(){
    return this.latAddress.asObservable();
  }
  getLng(){
    return this.lngAddress.asObservable();
  }
  setAddress(address: string){
    this.currAddress.next(address);
  }
  setLatLng(lat : string, lng : string){
    this.latAddress.next(lat);
    this.lngAddress.next(lng);
  }
  signInWithEmail(credentials){
       return this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
  }
  createUser(credentials){
    return new Promise((resolve,reject) => {
      firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then(
        res => {
         this.userId = this.afAuth.auth.currentUser.uid,
          resolve(res)
        },
        err => {
          reject(err);
        });
    });
  }
  getUserIdRegister(){
    return this.userId;
  }
  getUserId(){
    return this.user;
  }
  addDataEvent(record){
   return this.firestore.collection('event').add(record);
  }
  addDataUsers(record){
    return this.firestore.collection('users').add(record);
  }
  searchEventsId(id:string){
    this.firestore.collection('event',ref => ref.where('eid', '==', id))
    .get()
    .toPromise()
    .then(snapshot => {
      snapshot.forEach(doc => {
        return doc.data();
      });
    });
  }
}
