import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyAdvisorUpdateComponent } from './policy-advisor-update.component';

describe('PolicyAdvisorUpdateComponent', () => {
  let component: PolicyAdvisorUpdateComponent;
  let fixture: ComponentFixture<PolicyAdvisorUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolicyAdvisorUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolicyAdvisorUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
