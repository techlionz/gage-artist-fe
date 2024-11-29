import { EventEmitter, Component, OnInit, Output, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.scss']
})
export class DeleteConfirmComponent implements OnInit {

  @Output() yes = new EventEmitter<any>();
  @Output() no = new EventEmitter<any>();
  @Input() msg: string = "Are you sure you want to delete?";
  @Input() param: string = "";
  @Input() uid: string = "deleteConfirm";
  @ViewChild('deleteClose') deleteClose: any;

  constructor() { }

  ngOnInit(): void {
  }


  onYes() {
    this.yes.emit(this.param);

    this.deleteClose.nativeElement.click();
  }


  onNo() {
    this.no.emit(this.param);
    this.deleteClose.nativeElement.click();
  }

}
