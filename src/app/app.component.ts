import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ControllerComponent } from './base/components/controller.component';

/**
 * AppComponent is the main entry point for the application's UI.
 * It extends ControllerComponent, likely for shared routing or utility logic.
 */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends ControllerComponent {
  refreshList(): void {
    throw new Error('Method not implemented.');
  }

  // UI state properties, possibly used to toggle visibility in the main layout
  public editMode: boolean = false;
  public addMode: boolean = false;
  public viewMode: boolean = false;

  public currentYear: String = ''; // Used for copyright footers or dynamic labels

  constructor(public location: Location) {
	// Passes the location service to the parent ControllerComponent
    super(location);
  }

  override ngOnInit(): void {
	// Log the current route path (inherited from ControllerComponent)
    console.log(this.routePath);

	/**
     * Conditional logic based on the URL path:
     * If on the root path, show the actual year.
     * Otherwise, set it to 'Test' (likely for debugging or specific page branding).
     */

    if (this.routePath == '') {
      this.currentYear = new Date().getFullYear().toString();
    } else {
      this.currentYear = 'Test';
    }
  }
}
