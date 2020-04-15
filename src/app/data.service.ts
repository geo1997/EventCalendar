import { Injectable } from '@angular/core';
import {AngularFirestore, DocumentReference} from '@angular/fire/firestore';
import {EventInput} from '@fullcalendar/core';
import {Observable} from 'rxjs'
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore:AngularFirestore) { }

  addEvent(event :any){//Promise<DocumentReference>{
    return this.firestore.collection('eventsCalender').add(event)
  }

  //retrieve events from the db 
  retrieveEvents(info):Observable<any[]>{
    return this.firestore.collection('eventsCalender',
    ref => ref.orderBy('start').startAt(info.start).endAt(info.end)).snapshotChanges().pipe(
      map(events => events.map(event =>{
        let data:any = event.payload.doc.data();
        let id = event.payload.doc.id;
        return {id,...data}
      }))
    )
  }

  //implementation to send the updated event data to the db
  eventUpdate(id:string, data:any){
    return this.firestore.collection('eventsCalender').doc(id).update(data);
  }

  //delete implementation
  eventDelete(id){
    this.firestore.collection('eventsCalender').doc(id).delete();
  }

 

 
}
