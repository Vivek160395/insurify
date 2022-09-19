import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewalPolicyHomeComponent } from './renewal-policy-home.component';

describe('RenewalPolicyHomeComponent', () => {
  let component: RenewalPolicyHomeComponent;
  let fixture: ComponentFixture<RenewalPolicyHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenewalPolicyHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenewalPolicyHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
