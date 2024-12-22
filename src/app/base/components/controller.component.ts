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


  public modeSet: any = [];

  public routePath: string = '';

  private httpLocal: any;

  public title:String = "GoldenAge" ;

  constructor(location: Location, httpx?: HttpxService) {
    this.routePath = location.path().replace("/", "").split('?')[0];
    this.httpLocal = httpx;
  }

  ngOnInit(): void {
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
