import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.scss']
})
export class SendComponent implements OnInit {


	public sendChips: string = "" ;
	public action: string = "0" ;//1 or 0
  constructor(public matDialogRef: MatDialogRef<SendComponent>) {
	  
	  matDialogRef.disableClose = true;//disable default close operation
	    matDialogRef.beforeClosed().subscribe(() => matDialogRef.close({ 'chips' : this.sendChips, 'action': this.action } ));

   }
   
   onCancel(){
	   this.action = "0" ;
   }
   onSave() {
	   this.action = "1";
   }
   
  ngOnInit(): void {
  }

}
