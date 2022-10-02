import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredPolicyBuyersComponent } from './registered-policy-buyers.component';

describe('RegisteredPolicyBuyersComponent', () => {
  let component: RegisteredPolicyBuyersComponent;
  let fixture: ComponentFixture<RegisteredPolicyBuyersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisteredPolicyBuyersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisteredPolicyBuyersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
