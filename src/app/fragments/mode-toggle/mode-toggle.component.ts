import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';

@Component({
  selector: 'mode-toggle[id]',
  templateUrl: './mode-toggle.component.html',
  styleUrls: ['./mode-toggle.component.scss']
})
export class ModeToggleComponent implements OnInit {

  @Output() toggle = new EventEmitter<any>();
  @Input() values:string = "<i class='fa fa-close'></i>,<i class='fa fa-edit'></i>";
  @Input() id:string = "";

  private modes:any ;
  public data:any ;
  public modeIndex = 0 ;

  constructor() { 
    
  }

  ngOnInit(): void {
    this.modes = this.values.split(',')
    this.onToggle(null) ;
  }


  onToggle($e:any) {
    let length  = Object.keys(this.modes).length;

    let oldNodeIndex = this.modeIndex ;
    let oldIndex = this.modeIndex % length ;
    let oldData = this.modes[oldIndex] ;

    ++this.modeIndex ;

    let newIndex = this.modeIndex % length ;
    let newData = this.modes[newIndex] ;

    this.data = newData ;

    this.toggle.emit( { "index" : newIndex, "data" : this.data, "old_index" : oldIndex, "old_data" : oldData , "id" : this.id });
  }
}
