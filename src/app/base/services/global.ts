import { PageEvent } from "@angular/material/paginator";
import { environment } from "src/environments/environment";

/**
 * The Global class provides static utility methods and constants 
 * used across the entire application to ensure consistency.
 */

export class Global {

  // --- API Endpoint Path Constants ---
  public static API_LOGIN  = 'login';
  public static API_USER  = 'user';
  public static API_LOGOUT  = 'auth/logout';

  // Endpoint for handling artist-related file uploads and requests
  public static API_ARTIST_REQUEST = "artist/upload"

  /**
   * Make api url
   */
  public static api(path: string) {
    return environment.API_ENDPOINT + path ;
  }
  /**
   * Make chat api url
   */
  public static chatApi(path: string) {
    return environment.CHAT_API_ENDPOINT + path ;
  }

  /**
   * Make lobby api url
   */

  public static lobbyApi(path: string) {
	  return environment.LOBBY_WEB_URL + path ;
  }

  /**
   * Make socket api url
   */

  public static chatSocket() {
	  return environment.CHAT_SOCKET_URL ;
  }

  // --- Pagination Constants ---
  public static sizeOptions = [10, 25, 100] ;
  /**
   * Create default page event.
   */
  public static pageOptions() {
    let e  = new PageEvent() ;
    e.pageIndex = 0;
    e.pageSize = 10;
    e.length = 0;

    return { 'pageEvents' : e, 'sizeOptions' : this.sizeOptions } ;
  }

  public static chatNotifier:any ;
  public static chatCountNotifier:any;
}
