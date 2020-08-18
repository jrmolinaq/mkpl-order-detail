import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { OrderTrackingComponent } from './tracking.component';

import { FormatDatePipe } from './pipes/format-date.pipe';

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule,
		ReactiveFormsModule
	],
	declarations: [
		AppComponent,
		OrderTrackingComponent,
		FormatDatePipe
	],
	entryComponents: [AppComponent],
	bootstrap: [], // Don't bootstrap any component statically (see ngDoBootstrap() below)
	providers: [FormatDatePipe],
})
export class AppModule {
	// Avoid bootstraping any component statically because we need to attach to
	// the portlet's DOM, which is different for each portlet instance and,
	// thus, cannot be determined until the page is rendered (during runtime).
	ngDoBootstrap() {}
}
