import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ControllerComponent } from './base/components/controller.component';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent extends ControllerComponent {
	refreshList(): void {
		throw new Error('Method not implemented.');
	}
	public editMode: boolean = false;
	public addMode: boolean = false;
	public viewMode: boolean = false;

	public currentYear: String = "";//new Date().getFullYear() ;

	constructor(public location: Location) {
		super(location);
	}

	override ngOnInit(): void {
		console.log(this.routePath);

		if (this.routePath == "") {
			this.currentYear = (new Date()).getFullYear().toString() ;
		}
		else {
			this.currentYear = "Test";
		}
	}
}
