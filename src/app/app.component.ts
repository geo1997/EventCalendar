import { Events } from './modals/event.model';
import { EventModalComponent } from './event-modal/event-modal.component';
import {ListEventComponent} from './list-event/list-event.component'
import { Component, OnInit } from '@angular/core';
import {FormGroup , FormControl,Validators} from '@angular/forms'
import {DataService} from './data.service';
import {Calendar} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {AngularFirestore, DocumentReference, AngularFirestoreCollection} from '@angular/fire/firestore';

import interactPlugin from '@fullcalendar/interaction'
import * as firebase from 'firebase/app';
import 'firebase/firestore'; 
import { Observable, BehaviorSubject, from } from 'rxjs';
import { AboutListComponent } from './about-list/about-list.component';



//event listner for event copy and drag
var COPY:boolean=false;
document.addEventListener('keydown', (ev)=>{COPY=ev.ctrlKey});
document.addEventListener('keyup', (ev)=>{ if (ev.ctrlKey)COPY=false});




var today = new Date().toISOString().slice(0,10);



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
 
})
export class AppComponent implements OnInit {


eventForm:FormGroup;
modalRef:BsModalRef;
renderCalendar:Calendar;
eventRef:AngularFirestoreCollection<Events>;
event$:Observable<Events[]>;
startDate$:BehaviorSubject<Date>


constructor(private modalService:BsModalService ,private dataService : DataService,private firestore:AngularFirestore){
 
  //listen for changes in firestore to update the calendar
  firebase.firestore().collection('eventsCalender').onSnapshot(snap =>{
    this.renderCalendar.refetchEvents();
  })
  

}
   
ngOnInit(){

 

//show upcoming events on page load
this.showPopup();

this.renderCalendar = new Calendar(document.querySelector('#calendar'),

{
  //pass the event details to the model when an event is clicked
  eventClick:(info)=>{
    let initialState ={
        id:info.event.id,
        title:info.event.title,
        start:info.event.start
       
       
    };
    this.modalRef = this.modalService.show(EventModalComponent,{initialState});
    
  },
  themeSystem: 'bootstrap',
  header:{
    left:' next',
    center : 'title',
    right: 'today  nextYear'
  },
  height:524,
  timeZone: 'local',

  plugins:[dayGridPlugin,bootstrapPlugin,interactPlugin],

  editable:true,

  //implementation for event drag and copy
  eventDrop:(info)=>{
   
    
    if(COPY){//if the eventListner for copy is passed
      this.dataService.addEvent({title:info.event.title,
      start:info.event.start});
      info.revert();
      
      return;
    }
   
    else//if user just wants to drag the added event to another date
    if(confirm(`Move Event ?`)){
      this.dataService.eventUpdate(info.event.id,{start:info.event.start});
      this.modalRef.hide();
    
    
     
    }

    
    else{
      info.revert();
    }
    
    
  },
 
  //load the event data to the calender on page load
  eventDataTransform:(data: any)=>{
    data.start = data.start.toDate()// convert to date
    const newDate = new Date().getDate();//get current date

    if(newDate>data.start.getDate()){//check if the event date is less than the current date
      this.dataService.eventDelete(data.id);//delete the event
        data.color="red";
     }
    
    else{
      data.color="#2e7d32";
    }

    
    
    return data;

    
  },

  //fetch the event data from the db
  events:(info,success)=>{
    var subs =this.dataService.retrieveEvents(info).subscribe(data =>{

      success(data);//send the events to calander
     
      console.log(data);
      subs.unsubscribe();
    })
  },
  
  
 

}


);
this.renderCalendar.render();





}


//show event modal 
showModel(){
    this.modalRef = this.modalService.show(EventModalComponent);
  
}

//load recent eventa onclick
showPopup(){
  this.modalRef = this.modalService.show(ListEventComponent);
}

showFaq(){
  this.modalRef=this.modalService.show(AboutListComponent);
}




}
