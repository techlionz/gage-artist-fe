  import { Injectable } from '@angular/core';
  declare var SockJS: any;
  declare var Stomp: any;

  @Injectable({
    providedIn: 'root'
  })
  /** The messaging service **/
  export class MessagingService {

  public serverUrl = "http://127.0.0.1:8102/websocket";

    public stompClient:any;
    public onMessageReceiveE:any;
    public receiverThis:any;
    public msg = [];
    public senderId: String = "";
  //The register object
    public msgRegister: object = {
      sender : ""
    };
    //The message object
    public msgChat : object = {
      sender: "",
      receiver: "",
      content: " Hello I'm arrived. "
    } ;

    public onSubscribe(t:any, fn:Function) {
    this.receiverThis = t ;
    console.log(t) ;
        this.onMessageReceiveE = fn ;
    }

    constructor() {
      this.initializeWebSocketConnection();
    }
    /**
      Initialize connection with someone.
      **/
    initializeWebSocketConnection() {

      const ws = new SockJS(this.serverUrl);
      this.stompClient = Stomp.over(ws);

      const that = this;
      // tslint:disable-next-line:only-arrow-functions
      this.stompClient.connect({}, function(frame:any) {
  // Subscribe to the Public Topic

      }, function(error:any){
      });
    }

onMessageReceivedError (payload:any) {
    console.log(payload) ;
}

  registerUser(senderId: string) {

    let that = this ;
    this.stompClient.subscribe('/user/queue/errors', this.onMessageReceivedError);
    this.stompClient.subscribe('/user/queue/reply', (payload:any)=>{

    console.log("its here") ;
    console.log(payload) ;
    that.onMessageReceiveE(that.receiverThis, payload) ;
    });
    this.senderId = senderId ;
    let chat = { "sender" : "c" } ;
    chat.sender = "c" + senderId ; //TODO: for testing only.
      this.stompClient.send('/app/register' , {}, JSON.stringify(chat));
  }
  //Send a message to someone.
    sendMessage(receiverId: String, message:String) {
	  let sender = "" ;
	  let receiver = "" ;

	sender = "c" + this.senderId ;
	receiver = "p" + receiverId ;
    	
     let chat: object = {
      sender: sender,
      receiver: receiver,
      content: message,
    } ;
      this.stompClient.send('/app/message' , {}, JSON.stringify(chat));
    }
  }
