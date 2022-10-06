import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Insurance } from '../insurance';

@Injectable({
  providedIn: 'root'
})
export class EditInsuranceService {

  constructor(private http: HttpClient) { }

  editInsurance() {
    return this.http.get('http://localhost:8080/insurance/api/vk1/policy-id/123456')
  }
}
