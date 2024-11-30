import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class AuthyService {

	constructor() { }

	isLoggedIn() {
		try {
			let token = localStorage.getItem('userData') ?? ''; // get token from local storage
			if (token.length > 0) {
				try {
					let payload = JSON.parse(token);
					let userId = payload.id; // convert payload into an Object
					if (userId != "") {
						return true;
					}
				}
				catch (e) { }

			}
		}
		catch (e) {
		}
		return false;
	}
}
