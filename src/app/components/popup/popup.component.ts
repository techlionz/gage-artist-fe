import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent {
  @Input() file: string = '';
  artistForm: FormGroup;

  @Output() statusSelected = new EventEmitter<string>();

  constructor(private fb: FormBuilder) {
    this.artistForm = this.fb.group({
      id_status: ['']
    });
  }

  setStatus(status: string) {
    this.artistForm.patchValue({ id_status: status });
    this.statusSelected.emit(status);
    $('#myModal').modal('hide'); 
    console.log("status", status)
  }
}
