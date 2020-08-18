import { Component, Input, OnInit, OnChanges, ViewChild, AfterViewInit, ElementRef } from '@angular/core';

declare const Liferay: any;

@Component({
  selector: 'order-tracking',
  templateUrl:
    Liferay.ThemeDisplay.getPathContext() + 
    '/o/mkpl-order-detail/app/tracking.component.html'
})
export class OrderTrackingComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() data: { id: string, text: string }[];
  @Input() currentState: { index: number, linePercent: string };
  @Input() trackingDisable: boolean;
  @ViewChild('stepperRef', {static: true}) containerRef: ElementRef;
  config: any[] = [];

  ngOnInit() {
    this.data.forEach((el, index) => {
      if (this.trackingDisable) {
        this.config.push({
          class: '',
          textClass: '',
          text: el.text
        });
      } else {
        this.config.push({
          id: `tracking-${el.id}`,
          class: index < this.currentState.index ? 'passed' : (index === this.currentState.index ? 'current' : ''),
          textClass: index === this.currentState.index ? 'active-text' : '',
          text: el.text
        });
      }
    });
  }

  ngAfterViewInit() {
    this.containerRef.nativeElement.style.setProperty('--width-green-line', this.currentState.linePercent);
  }

  ngOnChanges(simpleChanges: any) {
    const { currentState } = simpleChanges;

    if (!currentState.firstChange && currentState.previousValue.index !== currentState.currentValue.index) {
      for (let index = 0; index < this.config.length; index++) {
        this.config[index].class = index < this.currentState.index ? 'passed' : (index === this.currentState.index ? 'current' : '');
        this.config[index].textClass = index === this.currentState.index ? 'active-text' : '';
      }
      this.containerRef.nativeElement.style.setProperty('--width-green-line', this.currentState.linePercent);
    }
  }
}
