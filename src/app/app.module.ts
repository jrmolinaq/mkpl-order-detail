import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { InputControlComponent } from './input-control.component';
import { ModalComponent } from './modal.component';
import { OrderTrackingComponent } from './tracking.component';
import { SparePartsListComponent } from './spare-parts-list.component';

import { FormatDatePipe } from './pipes/format-date.pipe';
import { ShortLargeStringsPipe } from './pipes/short-large-strings.pipe';

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule,
		ReactiveFormsModule
	],
	declarations: [
		AppComponent,
		InputControlComponent,
		ModalComponent,
		OrderTrackingComponent,
		SparePartsListComponent,
		FormatDatePipe,
		ShortLargeStringsPipe
	],
	entryComponents: [AppComponent],
	bootstrap: [], // Don't bootstrap any component statically (see ngDoBootstrap() below)
	providers: [
		FormatDatePipe,
		ShortLargeStringsPipe
	],
})
export class AppModule {
	// Avoid bootstraping any component statically because we need to attach to
	// the portlet's DOM, which is different for each portlet instance and,
	// thus, cannot be determined until the page is rendered (during runtime).
	ngDoBootstrap() {}
}
