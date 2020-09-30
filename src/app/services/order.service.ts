import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { OrderRequestParams, Order, OrderContent } from '../interfaces/order.interface';

// Borrar import
import { ORDER_STATES } from '../constants/states';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) { }

  // TODO service
  getOrders({ page, status, subsidiaryId, limit = 3 }: OrderRequestParams): Observable<any> {
    const params = new HttpParams()
      .set('status', status)
      .set('page', page.toString())
      .set('limit', limit.toString());
    return this.http.get<Order>(`/o/ProviderCompraDigitalPortlet/api/notice/subsidiary/${subsidiaryId}`, { params })
      .pipe(
        map(({ content, ...dataPaginator }) => {
          return {
            data: content,
            dataPaginator
          };
        })
      );
  }

  // TODO service
  getOrder(id: any) {
    return this.http.get<Order>(`/o/ProviderCompraDigitalPortlet/api/order/detail/${id}`);
  }

  // TODO service
  acceptOrder(id: any, body: any) {
    return this.http.put<OrderContent>(`/o/ProviderCompraDigitalPortlet/api/order/detail/${id}`, body);
  }

  // TODO service
  getCriticalOrders() {
    return this.http.get<Order[]>(`/o/ProviderCompraDigitalPortlet/api/order/critical`);
  }

  // TODO service
  dispatchOrder(id: any, body: any) {
    return this.http.put(`/o/ProviderCompraDigitalPortlet/api/order/dispatch/${id}`, body);
  }

  // TODO service
  updateProductStock( subsidiaryId: number, reference: string, amount: number): any {
      const params = new HttpParams()
        .set('reference', reference)
        .set('amount', amount.toString());

      this.http.get<any>(`/o/ProviderCompraDigitalPortlet/api/product/upd/${subsidiaryId}`, { params })
        .subscribe();
  }

  // TODO borrar dummy
  getOrders2(): OrderContent[] {

    let o1: any = {id: 11, date: '2020-07-31', status: 'assigned', workshop: 'Workshop1', time: '2020-07-31', externalNoticeId: 123};
    let o2: any = {id: 12, date: '2020-07-30', status: 'assigned', workshop: 'Workshop2', time: '2020-07-30', externalNoticeId: 123};
    let o3: any = {id: 13, date: '2020-07-29', status: 'completed', workshop: 'Workshop3', time: '2020-07-29', externalNoticeId: 123};
    let o4: any = {id: 14, date: '2020-07-28', status: 'completed', workshop: 'Workshop4', time: '2020-07-28', externalNoticeId: 123};
    let o5: any = {id: 15, date: '2020-07-27', status: 'accepted', workshop: 'Workshop5', time: '2020-07-27', externalNoticeId: 123};
    let o6: any = {id: 16, date: '2020-07-26', status: 'accepted', workshop: 'Workshop6', time: '2020-07-26', externalNoticeId: 123};
    
    let oc1: OrderContent = {id: 123, number: 123456, plate: 'ABC123', date: '2020-07-25', brand: 'Mazda', line: '2 Sedán', 
      workshop: 'Workshop1', city: 'Bogotá', status: 'assigned', products: [], externalEvent: 123456789, orders: [o1, o2, o3, o4, o5, o6]};
    
    let oc2: OrderContent = {id: 456, number: 123456, plate: 'ABC123', date: '2020-07-24', brand: 'Mazda', line: '2 Sedán', 
      workshop: 'Workshop2', city: 'Bogotá', status: 'completed', products: [], externalEvent: 789456123, orders: [o1, o2, o3]};    
    
    let oc3: OrderContent = {id: 789, number: 123456, plate: 'ABC123', date: '2020-07-23', brand: 'Mazda', line: '2 Sedán', 
      workshop: 'Workshop3', city: 'Bogotá', status: 'accepted', products: [], externalEvent: 654987321, orders: [o1, o2, o3]};



      ////////////////////////////////////////////
      /*
      console.log('*****');
      
      const params = new HttpParams().set('url', "test-inventario.xlsx").set('id_subsidiary', "1");
      
      this.http.post<any>(`/o/SendFileMKPLPortlet/sendfile/inventory`, {
        "url": "test-inventario.xlsx",
        "id_subsidiary": "1"
      })
      .subscribe(
        res => console.log('***** res ', res, ' --- ', res.message)
      );
      */
      ////////////////////////////////////////////
      
      
    return  Math.random() >= 0.5? [oc1, oc2, oc3]: [];
  }

  // TODO borrar dummy
  getOrder2(id: any) {

    let p1 = {status: ORDER_STATES.ASSIGNED, id: 101, reference: 'ABC123456', name: 'producto 1', amount: 2, 
      quality: 'GENUINE', estimatedDelivery: '2020-07-31'};
    let p2 = {status: ORDER_STATES.ASSIGNED, id: 102, reference: 'ABC234567', name: 'producto 2', amount: 1, 
      quality: 'GENUINE', estimatedDelivery: '2020-07-30'};
    let p3 = {status: ORDER_STATES.ASSIGNED, id: 103, reference: 'ABC345678', name: 'producto 3', amount: 3, 
      quality: 'GENUINE', estimatedDelivery: '2020-07-31'};
    let p4 = {status: ORDER_STATES.ASSIGNED, id: 104, reference: 'ABC456789', name: 'producto 4', amount: 2, 
      quality: 'GENUINE', estimatedDelivery: '2020-07-30'};
    let p5 = {status: ORDER_STATES.ASSIGNED, id: 105, reference: 'ABC567890', name: 'producto 5', amount: 1, 
      quality: 'GENUINE', estimatedDelivery: '2020-07-31'};
      
    let products: any[] = [p1, p2, p3, p4, p5];
    
    let orderInfo = {noticeNumber: 521, noticeDate: '2020-07-31', subsidiaryName: 'Sucursal 1', plate: 'ABC123', brand: 'Mazda', 
                     line: '2 sedán', vin: '123456789', workshopName: 'Taller prueba', coverage: 'abc', status: ORDER_STATES.ASSIGNED, 
                     id: id, orderDate: '2020-07-31', city: 'Bogotá', phone: 1234567, cellphone: 3043334445, email: 'prueba@email.com', 
                     products: products};

    return orderInfo;
  }

  // TODO borrar dummy
  acceptOrder2(id: any, body: any): any {
    
    let p1 = {status: ORDER_STATES.ASSIGNED, id: 101, reference: 'ABC123456', name: 'producto 1', amount: 2, 
      quality: 'GENUINE', estimatedDelivery: '2020-07-31'};
    let p2 = {status: ORDER_STATES.ASSIGNED, id: 102, reference: 'ABC234567', name: 'producto 2', amount: 1, 
      quality: 'GENUINE', estimatedDelivery: '2020-07-30'};
    let p3 = {status: ORDER_STATES.ASSIGNED, id: 103, reference: 'ABC345678', name: 'producto 3', amount: 3, 
      quality: 'GENUINE', estimatedDelivery: '2020-07-31'};
    
    let products: any[] = [p1, p2, p3];

    return products;
  }
  
  // TODO borrar dummy
  dispatchOrder2(id: any, body: any) {
    return '';
  }
}
