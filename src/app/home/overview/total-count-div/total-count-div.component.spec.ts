import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalCountDivComponent } from './total-count-div.component';

describe('TotalCountDivComponent', () => {
  let component: TotalCountDivComponent;
  let fixture: ComponentFixture<TotalCountDivComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalCountDivComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalCountDivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
