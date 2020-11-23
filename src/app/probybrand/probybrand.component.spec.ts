import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProbybrandComponent } from './probybrand.component';

describe('ProbybrandComponent', () => {
  let component: ProbybrandComponent;
  let fixture: ComponentFixture<ProbybrandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProbybrandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProbybrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
