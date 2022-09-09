import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewMarkupComponent } from './preview-markup.component';

describe('PreviewMarkupComponent', () => {
  let component: PreviewMarkupComponent;
  let fixture: ComponentFixture<PreviewMarkupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewMarkupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewMarkupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
