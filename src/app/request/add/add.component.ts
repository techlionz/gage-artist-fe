import { Location } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ControllerComponent } from 'src/app/base/components/controller.component';
import { AddInterface } from 'src/app/base/interfaces/AddInterface';
import { Global } from 'src/app/base/services/global';
import { HttpxService } from 'src/app/base/services/httpx.service';

@Component({
  selector: 'lead-company-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent extends ControllerComponent implements OnInit, AddInterface {

  // On ok press
  @Output() ok = new EventEmitter<any>();
  // The form named formCompany
  public formGroup: any = null;
  // The close button view
  @ViewChild('closeButton') closeButton:any;

  public view:any = { title : "New Company", save: "Save", close: "Cancel" } ;
  public viewPrefix:string  = "leadCompanyAdd" ;

  public override hasCityList = true;
  public override hasCountryList = true;
  public override hasStateList = true;
  public override hasSourceList = true;

  /**
   * Constructor.
   * 
   * @param httpx 
   * @param activatedRoute 
   */
  constructor(
    private httpx: HttpxService,
    private location: Location,
    private router: Router
  ) {
    super(location, httpx) ;
   }

  /**
   * On init 
   */
  override ngOnInit(): void {
    super.ngOnInit();
    this.loadAddForm() ;
  }
  /**
   * The load add form
   */
  loadAddForm(): void {
    this.formGroup = new FormGroup({
      name: new FormControl(),
      address1: new FormControl(),
      address2: new FormControl(),
      city_id: new FormControl(),
      state_id: new FormControl(),
      country_id: new FormControl(),
      web: new FormControl(),
      email: new FormControl(),
      fax: new FormControl(),
      phone: new FormControl()
    });
  }
  /**
   * On submit add form
   */
  onSubmitAdd(): void {
    let postData = this.formGroup.value;

    //Companys 
    this.httpx.post(Global.api(Global.API_COMPANY_CREATE), postData).subscribe((reply: any) => {
      if (reply.status == "OK") {
        this.ok.emit(reply);
        this.router.navigate(['companies']);
      }
    })
  }

  onSourceChange($e:any) {

  }
}
