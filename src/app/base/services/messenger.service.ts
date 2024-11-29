import { Injectable } from '@angular/core';
import { StompService } from './stomp.service';
import { Subscription } from 'rxjs';
import { Message } from '@stomp/stompjs';

@Injectable({
	providedIn: 'root'
})
export class MessengerService {

	constructor(private stompService: StompService) {
	}

	private topicSubscription: Subscription = new Subscription();
	private errorSubscription: Subscription = new Subscription();
	private receivedMessages: string[] = [];
	private senderId: String = "";
	
	private callerThis: any ;
	private errorCallback: Function = () => {};
	private messageCallback: Function  = () => {};

	setSenderId(senderId: String) {
		this.senderId = senderId;
	}
	
	subscribe(callerThis:any, messageCallback: Function, errorCallback: Function ) {
		this.callerThis = callerThis ;
		this.errorCallback = errorCallback ;
		this.messageCallback = messageCallback ;

		this.errorSubscription = this.stompService
			.watch('/user/queue/errors')
			.subscribe((message: Message) => {
				this.callbackErrorReceived(message);
			});


		this.topicSubscription = this.stompService
			.watch('/user/queue/reply')
			.subscribe((message: Message) => {
				console.log(message) ;
				console.log("OKEYYYYYYYYYYYYYYYYY") ;
				
				this.callbackMessageReceived(message);
			});
		this.stompService.activate() ;	
	}
	deactivate() {
		this.stompService.deactivate() ;
	}

	registerUser(senderId: string) {

		console.log("Make sure the user is not registered, before re registering.") ;

		this.senderId = senderId;
		let chat = { "sender": "c" };
		chat.sender = "c" + senderId; //TODO: for testing only.

		this.stompService.publish({ destination: '/app/register', body: JSON.stringify(chat) });
	}
	sendMessage(receiverId: String, message: String) {
		let sender = "";
		let receiver = "";

		sender = "c" + this.senderId;
		receiver = "p" + receiverId;

		let chat: object = {
			sender: sender,
			receiver: receiver,
			content: message,
		};

		this.stompService.publish({ destination: '/app/message', body: JSON.stringify(chat) });
	}

	/**
	 * When a successful message received.
	 */
	callbackMessageReceived(message: Message) {
		this.messageCallback(this.callerThis, message) ;
	}
	/**
	 * When an error received.
	 */
	callbackErrorReceived(message: Message) {
		this.errorCallback(this.callerThis, message) ;
	}
}
