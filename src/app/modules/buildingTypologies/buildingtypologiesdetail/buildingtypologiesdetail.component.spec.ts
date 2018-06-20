import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingtypologiesdetailComponent } from './buildingtypologiesdetail.component';

describe('BuildingtypologiesdetailComponent', () => {
  let component: BuildingtypologiesdetailComponent;
  let fixture: ComponentFixture<BuildingtypologiesdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildingtypologiesdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingtypologiesdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
