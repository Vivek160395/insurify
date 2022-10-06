import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Insurance } from '../insurance';

@Injectable({
  providedIn: 'root'
})
export class CreateInsuranceService {

  constructor(private http: HttpClient) { }

  registerInsurance(insurance: any) {
    return this.http.post<Insurance>('http://localhost:8080/insurance/api/vk1/life-policy', insurance)
  }
}
