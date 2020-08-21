import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PreSignedURL } from '../interfaces/pre-signed-url.interface';

@Injectable({ providedIn: 'root' })
export class PurcharseOrderService {
  constructor(private httpClient: HttpClient) { }

  // TODO Service
  getPurcharseOrderPDF(orderId: string): Observable<PreSignedURL> {
    const params = new HttpParams().set('orderId', orderId);
    return this.httpClient.get<PreSignedURL>(`http://localhost:8080/o/NotificationCompraDigitalPortlet/api/sellorder/presigneds3url`, { params })
      .pipe(
        catchError((httpError: HttpErrorResponse) => {
          if (httpError.status === 404) {
            if (httpError.error.errors[0].message === 'SellOrderDTO record not found') {
              return throwError('Aún no existe una orden de compra generada.');
            }
          }
          return throwError('Sucedio un error inesperado.');
        })
      );
  }
  
  // TODO borrar dummy
  getPurcharseOrderPDF2(){
    return '';
  }
}
