import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AddComponent } from './add/add.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FragmentsModule } from '../fragments/fragments.module';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

import { ImageUploadComponent } from '../base/components/image-upload';
import { NgxFileDropModule } from 'ngx-file-drop';

@NgModule({
  declarations: [
    ListComponent,
    DetailComponent,
    AddComponent,
    ImageUploadComponent,
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
    NgxFileDropModule
  ]
})
export class RequestModule { }
