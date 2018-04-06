import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderssupplierformComponent } from './orderssupplierform.component';

describe('OrderssupplierformComponent', () => {
  let component: OrderssupplierformComponent;
  let fixture: ComponentFixture<OrderssupplierformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderssupplierformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderssupplierformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
