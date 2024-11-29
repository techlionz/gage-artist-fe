import { EventEmitter, Output, Input, Component, OnInit } from '@angular/core';

@Component({
  selector: 'search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {
  @Input() value:string = "";
  @Input() placeholder:string = "Search";
  @Output() search = new EventEmitter<string>();
  @Output() change = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  onSearch($e:any) {
    this.search.emit(this.value);
  }
  onChange($e:any) {
    this.change.emit(this.value);
  }
}
