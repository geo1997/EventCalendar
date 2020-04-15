
import { environment } from '../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';


//firebase
import {AngularFireModule} from '@angular/fire'
import {AngularFirestoreModule} from '@angular/fire/firestore'

//date picker
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

//time picker
import { TimepickerModule } from 'ngx-bootstrap/timepicker';


import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';


import { PopoverModule } from 'ngx-bootstrap/popover';
import { EventModalComponent } from './event-modal/event-modal.component';

import {ModalModule} from 'ngx-bootstrap/modal';
import { ListEventComponent } from './list-event/list-event.component';
import { AboutListComponent } from './about-list/about-list.component';
import { NgxConfirmBoxModule,NgxConfirmBoxService } from 'ngx-confirm-box';
import { AlertModule } from 'ngx-bootstrap/alert';
@NgModule({
  declarations: [
    AppComponent,
    EventModalComponent,
    ListEventComponent,
    AboutListComponent,

   
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    PopoverModule.forRoot(),
    FormsModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    NgxConfirmBoxModule

  ],
  providers: [NgxConfirmBoxService],
  bootstrap: [AppComponent],
  entryComponents:[EventModalComponent, ListEventComponent,AboutListComponent]
})
export class AppModule { }
