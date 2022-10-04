import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerInsurancePurchase } from '../CustomerInsurancePurchase';

@Injectable({
  providedIn: 'root'
})
export class BuyInsuranceService {

  constructor(private http: HttpClient) { }
  buyInsurance(customerins: CustomerInsurancePurchase) {
    this.http.post<CustomerInsurancePurchase>('http://localhost:8080/api/add/customer-insurance', customerins)
  }
}
