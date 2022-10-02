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
<<<<<<< HEAD

=======
  });

  beforeEach(() => {
>>>>>>> 0c9a20832b700c04158dea28c3deb71ad5a06f3c
    fixture = TestBed.createComponent(PolicyAdvisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
