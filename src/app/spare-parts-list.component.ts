import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

// TODO: imports comentados
//import { ActivatedRoute } from '@angular/router';
//import { ROLES } from './../../../../../../../../constants/auth';
import { pluck } from 'rxjs/operators';

import { FormService } from './services/form.service';
import { ModalService } from './services/modal.service';
import { OrderService } from './services/order.service';
import { PurcharseOrderService } from './services/purcharse-order.service';

import { FIELDS, FORMAT_DATE } from './constants/spare-parts-list-constants';
import { ORDER_STATES, STATES } from './constants/states';
import { formatDate } from './utils/date.utils';

declare const Liferay: any;

// TODO revisar si funciona esta etiqueta de changeDetection
@Component({
  selector: 'spare-parts-list',
  templateUrl:
    Liferay.ThemeDisplay.getPathContext() + 
    '/o/mkpl-order-detail/app/spare-parts-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SparePartsListComponent implements OnInit {
  @Input() spareParts: any[] = [];
  @Input() orderStatus: string;
  @Output() updateStatus: EventEmitter<boolean> = new EventEmitter();
  form: FormGroup;
  tableInfo: Array<{ label: string; id: string; checkBox: boolean }>;
  checkAll = false;
  selectedSpareParts: any[] = [];
  selectedSparePartsStatus: any[] = [];
  selectedSparePartsTrigger: string;
  orderStates = ORDER_STATES;
  states = STATES;
  purcharseOrderError: string;
  canAcceptOrDispatchOrder = false;
  isLoadingDispatch = false;
  subsidiaryId: number;

  constructor(
    private orderService: OrderService,
    private modalService: ModalService,
    private formService: FormService,
    private purcharseOrderService: PurcharseOrderService
  ) { }

  get checkedParts() {
    return this.spareParts.filter(elem => {
          return  this.selectedSpareParts.some((part) => part.id === elem.id);
        });
  }

  ngOnInit() {
    // TODO obtener subsidiaryId de liferay
    this.subsidiaryId = 5;
    //TODO manejar permiso desde liferay -> user.role === ROLES.subsidiary
    this.canAcceptOrDispatchOrder = true;
    
    this.form = this.formService.createForm(FIELDS);
    this.tableInfo = [
      { label: 'Referencia', id: 'id', checkBox: true },
      { label: 'Nombre del repuesto', id: 'name', checkBox: false },
      { label: 'Cantidad', id: 'quantity', checkBox: false },
      { label: 'Calidad', id: 'quality', checkBox: false },
      { label: 'Entrega estimada', id: 'date', checkBox: false },
      { label: 'Estados', id: 'status', checkBox: false }
    ];
  }

  onCheck(id: any, status: any) {
    this.checkAll = false;
    if (this.selectedSpareParts.some((part) => part.id === id)) {
      this.selectedSpareParts = this.selectedSpareParts.filter(elem => elem.id !== id);
    } else {
        this.selectedSpareParts.push({id, status});
        this.setUpTrigger();
    }
    if (!this.selectedSpareParts.length) {
        this.selectedSparePartsTrigger = 'disabled';
    }
  }

  onCheckAll() {
    this.checkAll = !this.checkAll;
    const enableParts = this.spareParts.filter(elem => elem.status === ORDER_STATES.ACCEPTED || elem.status === ORDER_STATES.ASSIGNED);
    this.selectedSpareParts =
      (enableParts.length === this.selectedSpareParts.length && !this.checkAll)
      ? []
      : enableParts.map(elem => ({ id: elem.id, status: elem.status}));
    this.setUpTrigger();
    if (!this.selectedSpareParts.length) {
    this.selectedSparePartsTrigger = 'disabled';
    }
  }

  isChechked(sparePart: { id: any; }) {
    return this.selectedSpareParts.some((part) => part.id === sparePart.id);
  }

  private setUpTrigger() {
    if (this.selectedSpareParts.every((val) => val.status === ORDER_STATES.ACCEPTED)) {
      this.selectedSparePartsTrigger = 'dispatching';
      } else if (this.selectedSpareParts.every((val) => val.status === ORDER_STATES.ASSIGNED)) {
        this.selectedSparePartsTrigger = 'assigned';
      } else {
        this.selectedSparePartsTrigger = 'disabled';
      }
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  confirmOrder() {
    const selectedSpareParts = this.selectedSpareParts.map(elem => elem.id);
    this.modalService.close('confirm-spare-parts');

    // TODO llamado a servicio
    this.orderService.acceptOrder(
      this.getURLParameter("id") ,
      { product_order_ids: selectedSpareParts }
    ).subscribe(data => {
      this.spareParts = data.products;
      this.modalService.open('success-order-modal');
      this.checkAll = false;
      this.spareParts = this.spareParts.map(elem => ({ ...elem, checked: false }));
      this.updateStatus.emit(true);
    });

    /* TODO llamado servicio dummy
    this.spareParts = this.orderService.acceptOrder2(this.getURLParameter("id"), { product_order_ids: selectedSpareParts } );
    this.modalService.open('success-order-modal');
    this.checkAll = false;
    this.spareParts = this.spareParts.map(elem => ({ ...elem, checked: false }));
    this.updateStatus.emit(true);
    */

    for (const item of this.selectedSpareParts) {
      for (const elem of this.spareParts) {
        if (elem.id === item.id) {
          this.orderService.updateProductStock(this.subsidiaryId, elem.reference, elem.amount);
        }
      }
    }

    this.selectedSparePartsTrigger = 'disabled';
  }

  finishConfirm() {
    window.location.reload();
    this.closeModal('success-order-modal');
  }

  dispatchOrder() {
    const selectedSpareParts = this.selectedSpareParts.map((elem) => elem.id);
    
    const body = {
      product_order_ids: selectedSpareParts,
      date: formatDate(new Date().getTime(), FORMAT_DATE),
      guide_number: this.form.get('dispatchInfo').value.guideNumber,
      comment: this.form.get('dispatchInfo').value.comment,
    };

    // TODO reemplazo const orderId = this.route.snapshot.paramMap.get('id');
    const orderId = this.getURLParameter("id");
    
    this.isLoadingDispatch = true;
    
    // TODO llamado a servicio
    this.orderService.dispatchOrder(orderId, body).subscribe(() => {
      this.modalService.open('success-dispatch-modal');
      this.checkAll = false;
      this.isLoadingDispatch = false;
    });

   /* TODO servicio dummy
   this.orderService.dispatchOrder2(orderId, body);
   this.modalService.open('success-dispatch-modal');
   this.checkAll = false;
   this.isLoadingDispatch = false;
   */

    this.selectedSparePartsTrigger = 'disabled';
  }

  finishDispatch() {
    window.location.reload();
    this.closeModal('success-dispatch-modal');
  }

  openPurcharseOrder() {
    this.purcharseOrderError = null;

    // TODO reemplazo  const orderId = this.route.snapshot.paramMap.get('id');
    const orderId = this.getURLParameter("id");

    // TODO llamado a servicio
    this.purcharseOrderService.getPurcharseOrderPDF(orderId)
      .pipe(pluck('url'))
      .subscribe(url => {
        window.open(url);
      },
      error => {
        this.purcharseOrderError = error;
      });

    // TODO servicio dummy
    // this.purcharseOrderService.getPurcharseOrderPDF2();
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
