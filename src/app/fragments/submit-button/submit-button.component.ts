import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'submit-button',
  templateUrl: './submit-button.component.html',
  styleUrls: ['./submit-button.component.scss']
})
export class SubmitButtonComponent implements OnInit {

  @Input() backUrl:string ="javascript:;";
  public view:any = { title : "Submit"} ;

  constructor() { }

  ngOnInit(): void {
  }

}
