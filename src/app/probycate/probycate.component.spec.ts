import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProbycateComponent } from './probycate.component';

describe('ProbycateComponent', () => {
  let component: ProbycateComponent;
  let fixture: ComponentFixture<ProbycateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProbycateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProbycateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
