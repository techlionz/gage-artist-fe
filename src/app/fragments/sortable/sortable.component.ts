import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';

@Component({
  selector: 'sortable',
  templateUrl: './sortable.component.html',
  styleUrls: ['./sortable.component.scss']
})
export class SortableComponent implements OnInit {

  @Output() toggle = new EventEmitter<any>();
  @Input() values:string = "DESC,ASC";
  @Input() uiValues:string = "<i class='fa-solid fa-arrow-up'></i>,<i class='fa-solid fa-arrow-down'></i>";
  @Input() caption:string = "";
  @Input() name:string = "";
  @Input() id:string = "";

  private modeUiValues:any ;
  private modeValues:any ;
  public data:any ;
  public modeIndex = 0 ;

  constructor() { 
    
  }

  ngOnInit(): void {
    this.modeUiValues = this.uiValues.split(',')
    this.modeValues = this.values.split(',')
    this.onToggle(null) ;
  }


  onToggle($e:any) {

    ++this.modeIndex ;

    let newIndex = this.modeIndex % 2 ;
    let newUiValue = this.modeUiValues[newIndex] ;
    let newValue = this.modeValues[newIndex] ;

    this.data = this.caption + newUiValue ;

    if( $e ) {
      this.toggle.emit( { "name" : this.name, "order" : newValue} );
    }
  }
}
