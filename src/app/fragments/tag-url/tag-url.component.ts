import { Input, Component, OnInit } from '@angular/core';

@Component({
  selector: 'tag-url',
  templateUrl: './tag-url.component.html',
  styleUrls: ['./tag-url.component.scss']
})
export class TagUrlComponent implements OnInit {
  @Input() url="";
  @Input() target="_blank";
  constructor() { }

  ngOnInit(): void {
  }

}
