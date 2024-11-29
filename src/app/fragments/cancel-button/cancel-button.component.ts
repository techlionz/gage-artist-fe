import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cancel-button',
  templateUrl: './cancel-button.component.html',
  styleUrls: ['./cancel-button.component.scss']
})
export class CancelButtonComponent implements OnInit {

  @Input() backUrl:string ="javascript:;";
  public view:any = { title : "Cancel"} ;
  constructor() { }

  ngOnInit(): void {
  }

}
