import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ControllerComponent } from 'src/app/base/components/controller.component';
import { DetailEditInterface } from 'src/app/base/interfaces/DetailEditInterface';
import { Global } from 'src/app/base/services/global';
import { HttpxService } from 'src/app/base/services/httpx.service';
import { ModeToggleComponent } from 'src/app/fragments/mode-toggle/mode-toggle.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent extends ControllerComponent implements OnInit, DetailEditInterface {
  

  constructor(private httpx: HttpxService, private activatedRoute: ActivatedRoute, location: Location) {
    super(location, httpx);

    this.hasCityList = true ;
    this.hasStateList = true ;
    this.hasCountryList = true ;
  }
  
  public formGroup: any = null;
  public detail: any;
  public companyId: any;
  public view: any = { title: "Edit Company", save: "Save", close: "Cancel", subtitle: "Edit company details" };
  public viewPrefix: string = "leadCompanyEdit";

  @ViewChild(ModeToggleComponent) modeToggle!: ModeToggleComponent;

  override ngOnInit(): void {
    this.detail = {
      name: "",
      address1: "",
      address2: "",
      city_id: 0,
      state_id: 0,
      country_id: 0,
      zip: "",
      web: "",
      email: "",
      fax: "",
      phone: ""
    };
    super.ngOnInit();
    this.companyId = this.activatedRoute.snapshot.queryParamMap.get("id");
    
    this.loadEditForm() ;

    this.onRefreshList() ;
  }

  onRefreshList(): void {
    this.httpx.get(Global.api('company/' + this.companyId)).subscribe((data: any) => {
      this.detail = data.data;
      this.loadEditForm();
    })
  }



  loadEditForm(): void {
    this.formGroup = new FormGroup({
      name: new FormControl(this.detail.name),
      address1: new FormControl(this.detail.address1),
      address2: new FormControl(this.detail.address2),
      city_id: new FormControl(this.detail.city_id),
      state_id: new FormControl(this.detail.state_id),
      country_id: new FormControl(this.detail.country_id),
      zip: new FormControl(this.detail.zip),
      web: new FormControl(this.detail.web),
      email: new FormControl(this.detail.email),
      fax: new FormControl(this.detail.fax),
      phone: new FormControl(this.detail.phone)
    });
  }

  onSubmitCancel() {
    this.modeToggle.onToggle(null);
  }
  onSubmitEdit() {
    //submit form here.

    let postData = this.formGroup.value;
    //Communications 
    this.httpx.put(Global.api(Global.API_COMPANY_UPDATE + this.companyId), postData).subscribe((reply: any) => {

      if (reply.status == "OK") {
        this.modeToggle.onToggle(null);
        this.onRefreshList();
      }
    })
  }

}
