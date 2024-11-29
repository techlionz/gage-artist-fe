import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'new-button',
  templateUrl: './new-button.component.html',
  styleUrls: ['./new-button.component.scss']
})
export class NewButtonComponent implements OnInit {
  @Input() caption:string = "New";
  constructor() { }

  ngOnInit(): void {
  }

}
