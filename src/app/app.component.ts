import { Component, OnInit } from '@angular/core';

import { OrderService } from './services/order.service';
import { STATES, ORDER_STATES } from './constants/states';

import { TRACKING_STATES, STATES_INDEX } from './constants/order-detail-constants';

declare const Liferay: any;

@Component({
	templateUrl: 
		Liferay.ThemeDisplay.getPathContext() + 
		'/o/mkpl-order-detail/app/app.component.html'
})
export class AppComponent implements OnInit {
	states = TRACKING_STATES;
	orderStates = STATES;
	currentState = { index: 0, linePercent: TRACKING_STATES[0].linePercent };
	stateIndex = 0;
	trackingDisable = false;
	orderInfo: any;
	canToBack: any;

	constructor(private orderService: OrderService) {}

	ngOnInit() {
	  // TODO esto depende de los roles del usuario logueado
	  // this.canToBack = user.role === ROLES.subsidiary || user.role === ROLES.provider;
	  this.canToBack = true;
	  
	  this.getOrders();
	}

	getOrders() {
	  // TODO service
	  this.orderService
		.getOrder(this.getURLParameter("id"))
		.subscribe((data) => {
		  this.orderInfo = data;
		  const conditions =
			this.orderInfo.status === ORDER_STATES.ASSIGNED ||
			this.orderInfo.status === ORDER_STATES.REJECTED;
		  if (!conditions) {
			this.configCurrentState(this.orderInfo.status);
		  }
		  this.trackingDisable = conditions;
		});
/*
	  this.orderInfo = this.orderService.getOrder2(this.getURLParameter("id"));
	  const conditions =
	    this.orderInfo.status === ORDER_STATES.ASSIGNED ||
	    this.orderInfo.status === ORDER_STATES.REJECTED;
	  if (!conditions) {
	    this.configCurrentState(this.orderInfo.status);
	  }
	  this.trackingDisable = conditions;
*/
	}
  
	configCurrentState(state: string) {
	  const currentState = state === ORDER_STATES.DISPATCHING ? ORDER_STATES.ACCEPTED : state;
	  const stateIndex = STATES_INDEX.filter(
		(elem: { id: any; }) => elem.id === currentState
	  ).map((elem: { index: any; }) => elem.index)[0];
	  this.currentState = {
		index: stateIndex,
		linePercent: TRACKING_STATES[stateIndex].linePercent,
	  };
	}

	// this.getURLParameter("id")
	private getURLParameter(paramName: string){
	  var pageURL = window.location.search.substring(1);
	  var variables = pageURL.split('&');
	  for (var i = 0; i < variables.length; i++) {
	    var param = variables[i].split('=');
	    if (param[0] == paramName) {
	      return param[1];
	    }
	  }
	}​

}
