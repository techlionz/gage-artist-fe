import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { debug } from 'console';
import { Global } from '../services/global';
import { HttpxService } from '../services/httpx.service';


@Component({
  selector: 'app-navbar',
  template: '',
  styleUrls: []
})
export abstract class ControllerComponent implements OnInit {

  public hasProductList: boolean = false;
  public hasCompanyList: boolean = false;
  public hasCommunicationList: boolean = false;
  public hasSourceList: boolean = false;
  public hasBrokerList: boolean = false;

  public hasCityList: boolean = false;
  public hasStateList: boolean = false;
  public hasCountryList: boolean = false;

  public modeSet: any = [];

  public routePath: string = '';
  public productList: any;
  public companyList: any;
  public communicationList: any;
  public sourceList: any;
  public brokerList: any;

  public cityList: any;
  public stateList: any;
  public countryList: any;
  public brokerCategoryList: any = [ { "id" : "Fixed", "name" : "Fixed"}, { "id" : "Percentage", "name" : "Percentage"} ];

  private httpLocal: any;

  public title:String = "GoldenAge" ;

  constructor(location: Location, httpx?: HttpxService) {
    this.routePath = location.path().replace("/", "").split('?')[0];
    this.httpLocal = httpx;
  }

  ngOnInit(): void {
    if (this.httpLocal) {
      if (this.hasProductList) {
        this.onLoadProducts(this.httpLocal)
      }
      if (this.hasCompanyList) {
        this.onLoadCompanies(this.httpLocal)
      }
      if (this.hasCommunicationList) {
        this.onLoadCommunications(this.httpLocal)
      }
      if (this.hasSourceList) {
        this.onLoadSources(this.httpLocal)
      }
      if (this.hasBrokerList) {
        this.onLoadBrokers(this.httpLocal)
      }

      if (this.hasCityList) {
        this.onLoadCities(this.httpLocal)
      }
      if (this.hasStateList) {
        this.onLoadStates(this.httpLocal)
      }
      if (this.hasCountryList) {
        this.onLoadCountries(this.httpLocal)
      }
    }
  }

  onLoadProducts(httpx: HttpxService) {
    //Communications
    httpx.get(Global.api(Global.API_PRODUCT_LIST)).subscribe((products: any) => {
      this.productList = products.data.records;
    })
  }
  onLoadCompanies(httpx: HttpxService) {
    //Communications
    httpx.get(Global.api(Global.API_COMPANY_LIST)).subscribe((companies: any) => {
      this.companyList = companies.data.records;
    })
  }
  onLoadCommunications(httpx: HttpxService) {
    //Communications
    httpx.get(Global.api(Global.API_COMMUNICATION_LIST)).subscribe((communication: any) => {
      this.communicationList = communication.data.records;
    })
  }
  onLoadSources(httpx: HttpxService) {
    //Communications
    httpx.get(Global.api(Global.API_SOURCE_LIST)).subscribe((sources: any) => {
      this.sourceList = sources.data.records;
    })
  }
  onLoadBrokers(httpx: HttpxService) {
    //Communications
    httpx.get(Global.api(Global.API_BROKER_LIST)).subscribe((brokers: any) => {
      this.brokerList = brokers.data.records;
    })
  }
  onLoadCities(httpx: HttpxService) {
    //Communications
    httpx.get(Global.api(Global.API_CITY_LIST)).subscribe((brokers: any) => {
      this.cityList = brokers.data.records;
    })
  }
  onLoadStates(httpx: HttpxService) {
    //Communications
    httpx.get(Global.api(Global.API_STATE_LIST)).subscribe((brokers: any) => {
      this.stateList = brokers.data.records;
    })
  }
  onLoadCountries(httpx: HttpxService) {
    //Communications
    httpx.get(Global.api(Global.API_COUNTRY_LIST)).subscribe((brokers: any) => {
      this.countryList = brokers.data.records;
    })
  }

  onModeToggle(data: any) {
    let id = data["id"];
    this.modeSet[id] = data["old_index"];
  }

  public ifMode(id: string, value: number) {
    if (this.modeSet[id] == value) {
      return true;
    }
    return false;
  }

}
