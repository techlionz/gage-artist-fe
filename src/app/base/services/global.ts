import { PageEvent } from "@angular/material/paginator";
import { environment } from "src/environments/environment";

export class Global {

  public static API_LEAD_LIST ='leads';
  public static API_LEAD_DETAIL ='lead/';
  public static API_LEAD_CREATE = 'leads';
  public static API_LEAD_NOTE_CREATE = 'lead-notes';
  public static API_LEAD_NOTE_LIST = 'lead-notes';
  public static API_LEAD_NOTE_UPDATE = 'lead-note/';
  public static API_LEAD_NOTE_DELETE = 'lead-note/';
  public static API_LEAD_NOTE_DETAIL = 'lead-note/';

  public static API_LEAD_UPDATE = 'lead/';

  public static API_COMPANY_LIST ='companies';
  public static API_COMPANY_DETAIL ='company/';
  public static API_COMPANY_CREATE = 'companies';
  public static API_COMPANY_UPDATE = 'company/';

  public static API_PRODUCT_LIST ='products';
  public static API_PRODUCT_DETAIL ='product/';
  public static API_PRODUCT_CREATE = 'products';
  public static API_PRODUCT_UPDATE = 'product/';

  public static API_BROKER_LIST ='lead-brokers';
  public static API_BROKER_DETAIL ='lead-broker/';
  public static API_BROKER_CREATE ='lead-brokers';
  public static API_BROKER_UPDATE ='lead-broker/';

  public static API_SOURCE_LIST ='lead-sources';
  public static API_SOURCE_DETAIL ='lead-source/';
  public static API_SOURCE_CREATE ='lead-sources';
  public static API_SOURCE_EDIT ='lead-source/';

  public static API_STATUS_LIST ='lead-statuses';
  public static API_STATUS_DETAIL ='lead-status/';
  public static API_STATUS_CREATE ='lead-statuses';
  public static API_STATUS_EDIT ='lead-status/';

  public static API_COMMUNICATION_LIST ='lead-communications';
  public static API_COMMUNICATION_DETAIL ='lead-communication/';
  public static API_COMMUNICATION_EDIT ='lead-communication/';
  public static API_COMMUNICATION_CREATE ='lead-communications';

  public static API_LEAD_FOLLOWUP_LIST ='lead-followups';
  public static API_LEAD_FOLLOWUP_CREATE = 'lead-followups';
  public static API_LEAD_FOLLOWUP_UPDATE = 'lead-followup/';

  public static API_LEAD_CONTACT_LIST = 'lead-contacts';
  public static API_LEAD_CONTACT_DETAIL = 'lead-contact/';
  public static API_LEAD_CONTACT_EDIT = 'lead-contact/';
  public static API_LEAD_CONTACT_CREATE = 'lead-contacts';


  public static API_CITY_LIST ='cities';
  public static API_STATE_LIST ='states';
  public static API_COUNTRY_LIST ='countries';

  public static API_ACTIVITY_LAST ='activities-last';

  public static API_LOGIN  = 'login';
  public static API_USER  = 'user';
  public static API_LOGOUT  = 'auth/logout';

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

  public static lobbyApi(path: string) {
	  return environment.LOBBY_WEB_URL + path ;
  }


  public static chatSocket() {
	  return environment.CHAT_SOCKET_URL ;
  }


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
