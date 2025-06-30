// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
	APP_WELCOME: 'http://localhost:4202/login.html',
	APP_DASHBOARD: 'http://localhost:4202/requests',
	AUTH_BEGIN: 'http://localhost/gage-be/public/auth/begin',
	API_ENDPOINT: 'http://localhost:1080/api/v1/',
	CHAT_API_ENDPOINT: 'http://localhost:8102/',
	LOBBY_WEB_URL: 'http://localhost:48001/web',
	CHAT_SOCKET_URL: 'ws://127.0.0.1:8102/websocket',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
