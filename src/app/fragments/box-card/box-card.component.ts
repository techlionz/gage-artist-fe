import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'box-card',
  templateUrl: './box-card.component.html',
  styleUrls: ['./box-card.component.scss']
})
export class BoxCardComponent implements OnInit {
  @Input() title: string = "";
  @Input() message: string = "";
  @Input() fontIcon: string = "";
  @Input() urlIcon: string = "";
  @Input() color: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
