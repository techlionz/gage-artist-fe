import { Input, Component, OnInit } from '@angular/core';

@Component({
  selector: 'tag-email',
  templateUrl: './tag-email.component.html',
  styleUrls: ['./tag-email.component.scss']
})
export class TagEmailComponent implements OnInit {

  @Input() email:string = "";
  constructor() { }

  ngOnInit(): void {
  }

}
