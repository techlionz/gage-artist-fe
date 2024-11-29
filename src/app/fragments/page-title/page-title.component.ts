import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.scss']
})
export class PageTitleComponent implements OnInit {
  @Input() title= "";
  @Input() subtitle= "";

  constructor() { }

  ngOnInit(): void {
  }

}
