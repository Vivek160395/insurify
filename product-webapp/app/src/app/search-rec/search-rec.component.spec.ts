import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchRecComponent } from './search-rec.component';

describe('SearchRecComponent', () => {
  let component: SearchRecComponent;
  let fixture: ComponentFixture<SearchRecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchRecComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchRecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
