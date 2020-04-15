import { Component, OnInit } from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

import { Events } from '../modals/event.model';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import 'firebase/firestore'; 
import {AngularFirestore, DocumentReference, AngularFirestoreCollection} from '@angular/fire/firestore';

@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.component.html',
  styleUrls: ['./list-event.component.css']
})
export class ListEventComponent implements OnInit {
  eventRef:AngularFirestoreCollection<Events>;
event$:Observable<Events[]>;

  constructor(public modalRef:BsModalRef,private firestore:AngularFirestore ) { }

  ngOnInit(): void {

    var startOfToday = new Date(); 
    startOfToday.setHours(0,0,0,0);
    var endOfToday = new Date(); 
    endOfToday.setHours(23,59,59,999);

    //the events with the current day dates are retrieved from the databse and shown as the upcoming events
    this.event$ =this.firestore.collection<Events>('eventsCalender',
    ref=>
    ref.where('start','>=',startOfToday).where('start', '<=', endOfToday)).valueChanges();
    this.event$.subscribe(data => console.log(data));
  }

}
