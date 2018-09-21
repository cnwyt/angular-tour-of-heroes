import { Component, OnInit } from '@angular/core';

// Open MessagesComponent and import the MessageService.
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  // constructor() { }
  // Angular will inject the singleton MessageService into that property 
  // when it creates the MessagesComponent.
  // The messageService property must be public 
  // because you're about to bind to it in the template.
  constructor(public messageService: MessageService) {}


  ngOnInit() {
  }

}
