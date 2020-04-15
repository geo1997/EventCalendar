import { BsDatepickerModule,BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { FormGroup,FormControl,Validators  } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';

import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import { NgxConfirmBoxService } from 'ngx-confirm-box';
@Component({
  selector: 'app-event-modal',
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.css'],
 
 
})
export class EventModalComponent implements OnInit {
  
  //initilize variables
  dismissible = true;
  id:string;
  title:string;
  start :  Date;
  minDate: Date;

// alert functionality
defaultAlerts: any[] = [
  {
    type: 'danger',
    msg: `Please Enter A Title And A Date.`
  }
];
alerts;

reset(): void {
  this.alerts = this.defaultAlerts;
}

onClosed(dismissedAlert: any): void {
  this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
}

  eventForm:FormGroup;
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();

 

  constructor(public modalRef:BsModalRef ,private dataService : DataService,private confirmBox: NgxConfirmBoxService) {
    const newDate = new Date().getDate();
    this.dpConfig.containerClass = 'theme-dark-blue';
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate() );
    this.dpConfig.showWeekNumbers=false;

   
   
   }

   bgColor           ='rgba(0,0,0,0.5)'; // overlay background color
   confirmHeading    = '';
   confirmContent    = "Are you sure want to delete ?";
   confirmCanceltext = "Cancel";
   confirmOkaytext   = "Okay";

  ngOnInit(): void {
    this.eventForm = new FormGroup({
      //retrieve values from the form and assign them to variables and validate
      title:new FormControl(this.title,Validators.required),
      start: new FormControl(this.start,Validators.required),
      
    })
  }

  // send the event data to the database
  async saveEvent(){
      if(this.eventForm.valid){
          await this.dataService.addEvent(this.eventForm.value);
           this.modalRef.hide();
      }else{
        this.alerts= this.defaultAlerts;
     
       }
      
     }

  //update event details and send to databse
    async eventUpdate(){
      if(this.eventForm.valid){
        await this.dataService.eventUpdate(this.id,
          this.eventForm.value);
      this.modalRef.hide();
        }else{
          this.alerts= this.defaultAlerts;
        }
     
    }

    //delete event
    async deleteEvent(){
      this.confirmBox.show();
     
  }

  confirmChange(showConfirm:boolean){
    if(showConfirm){
       
        if(showConfirm){
           this.dataService.eventDelete(this.id);
        this.modalRef.hide();
        this.confirmBox.hide();
      }
    }
}
}
