import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderseditformComponent } from './orderseditform.component';

describe('OrderseditformComponent', () => {
  let component: OrderseditformComponent;
  let fixture: ComponentFixture<OrderseditformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderseditformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderseditformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
