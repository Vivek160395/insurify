import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewCompletionComponent } from './renew-completion.component';

describe('RenewCompletionComponent', () => {
  let component: RenewCompletionComponent;
  let fixture: ComponentFixture<RenewCompletionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenewCompletionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenewCompletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
