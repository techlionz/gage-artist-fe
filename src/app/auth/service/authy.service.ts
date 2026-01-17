import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthyService {
  constructor() {}

  isLoggedIn() {
    try {
      let token = localStorage.getItem('userData') ?? ''; // get token from local storage
      if (token.length > 0) {
        try {
			// Attempt to parse the stringified JSON into a JavaScript object
          let payload = JSON.parse(token);
          let userId = payload.id; // convert payload into an Object
		  // Check if the 'id' property exists and is not empty
          if (userId != '') {
            return true;
          }
		  // Catch potential JSON parsing errors if 'userData' is corrupted
        } catch (e) {}
      }
    } catch (e) {}
	// Default to false if any checks fail
    return false;
  }
}
