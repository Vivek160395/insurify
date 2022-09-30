import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredPoliciesComponent } from './registered-policies.component';

describe('RegisteredPoliciesComponent', () => {
  let component: RegisteredPoliciesComponent;
  let fixture: ComponentFixture<RegisteredPoliciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisteredPoliciesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisteredPoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
