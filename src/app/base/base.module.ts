import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StompService } from './services/stomp.service';
import { StompServiceFactory } from './services/stomp.service.factory';

@NgModule({
	providers: [
		{
		provide: StompService,
	    useFactory: StompServiceFactory,
	    }
	],
  declarations: [
  
  ],
  imports: [
    CommonModule
  ]
})
export class BaseModule { }
