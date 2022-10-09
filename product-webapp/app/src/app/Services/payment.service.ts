import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from '../payment';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }


  createOrder(order: Payment): Observable<any> {
    // return this.http.post("http://localhost:8080/payment/pg/createOrder",order, httpOptions);
    return this.http.post("http://localhost:8080/payment/pg/createOrder", order, httpOptions);
    // name: order.name,
    // emailId: order.email,
    // mobileNo: order.phone,
    // currency:order.currency,
    // amount: order.amount,
    // customerPolicyId: order.policyId,
    // policyType: order.policyType,
    // paymentMode: order.paymentMode,
    // tax: order.tax,
    // discount: order.discount,
    // paymentDate: order.date,
    // paymentTime: order.time
    // }, httpOptions);
  }


}
