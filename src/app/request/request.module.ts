import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { SendComponent } from './send/send.component';
import { DetailComponent } from './detail/detail.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AddComponent } from './add/add.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FragmentsModule } from '../fragments/fragments.module';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    ListComponent,
    DetailComponent,
    AddComponent,
    SendComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    MatPaginatorModule,
    FormsModule,
    FragmentsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
  ]
})
export class RequestModule { }
