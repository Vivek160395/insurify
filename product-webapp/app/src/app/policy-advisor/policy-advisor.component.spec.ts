import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyAdvisorComponent } from './policy-advisor.component';

describe('PolicyAdvisorComponent', () => {
  let component: PolicyAdvisorComponent;
  let fixture: ComponentFixture<PolicyAdvisorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolicyAdvisorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyAdvisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
