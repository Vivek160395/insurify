import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseInsuranceComponent } from './purchase-insurance.component';

describe('PurchaseInsuranceComponent', () => {
  let component: PurchaseInsuranceComponent;
  let fixture: ComponentFixture<PurchaseInsuranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseInsuranceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
