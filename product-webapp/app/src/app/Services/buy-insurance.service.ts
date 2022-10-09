import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerInsurancePurchase } from '../CustomerInsurancePurchase';

@Injectable({
  providedIn: 'root'
})
export class BuyInsuranceService {
  // baseurl='https://insurify.stackroute.io/'
  baseurl = 'https://insurify.stackroute.io/'
  constructor(private http: HttpClient) { }
  buyInsurance(customerins: CustomerInsurancePurchase) {
    this.http.post<CustomerInsurancePurchase>(this.baseurl+'purchase/api/add/customer-insurance', customerins)
  }
}
