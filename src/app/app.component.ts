import { Component, OnInit } from '@angular/core';

declare const Liferay: any;

@Component({
	templateUrl: 
		Liferay.ThemeDisplay.getPathContext() + 
		'/o/mkpl-order-detail/app/app.component.html'
})
export class AppComponent implements OnInit {
	orderId: string;

	constructor() {}

	ngOnInit(): void {
		console.log("***** " + this.getURLParameter("id"));
		this.orderId = this.getURLParameter("id");
	}

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
