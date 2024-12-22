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
export abstract class ListControllerComponent implements OnInit {

  public routePath: string = '';
  public activity :any;

  private httpLocal: any;

  constructor(location: Location, httpx?: HttpxService) {
    this.routePath = location.path().replace("/", "").split('?')[0];
    this.httpLocal = httpx;
  }

  ngOnInit(): void {
  }


}
