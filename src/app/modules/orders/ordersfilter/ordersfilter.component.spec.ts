import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersfilterComponent } from './ordersfilter.component';

describe('OrdersfilterComponent', () => {
  let component: OrdersfilterComponent;
  let fixture: ComponentFixture<OrdersfilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersfilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersfilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
