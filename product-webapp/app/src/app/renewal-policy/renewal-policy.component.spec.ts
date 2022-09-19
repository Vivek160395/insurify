import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewalPolicyComponent } from './renewal-policy.component';

describe('RenewalPolicyComponent', () => {
  let component: RenewalPolicyComponent;
  let fixture: ComponentFixture<RenewalPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenewalPolicyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenewalPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
