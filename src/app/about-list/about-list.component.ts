import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-list',
  templateUrl: './about-list.component.html',
  styleUrls: ['./about-list.component.css']
})
export class AboutListComponent implements OnInit {

  constructor(public modalRef:BsModalRef) { }

  ngOnInit(): void {
  }

}
