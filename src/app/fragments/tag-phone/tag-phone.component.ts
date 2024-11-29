import {Input, Component, OnInit } from '@angular/core';

@Component({
  selector: 'tag-phone',
  templateUrl: './tag-phone.component.html',
  styleUrls: ['./tag-phone.component.scss']
})
export class TagPhoneComponent implements OnInit {

  @Input() phone:string = "";
  constructor() { }

  ngOnInit(): void {
  }

}
