import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersTitleComponent } from './orders-title.component';

describe('OrdersTitleComponent', () => {
  let component: OrdersTitleComponent;
  let fixture: ComponentFixture<OrdersTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersTitleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrdersTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
