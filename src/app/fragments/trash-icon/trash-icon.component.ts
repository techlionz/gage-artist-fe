import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'trash-icon',
  templateUrl: './trash-icon.component.html',
  styleUrls: ['./trash-icon.component.scss']
})
export class TrashIconComponent implements OnInit {

  @Input() enabled:boolean = false ;

  constructor() { }

  ngOnInit(): void {
  }

}
