import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputPasswordResetComponent } from './input-password-reset.component';

describe('InputPasswordResetComponent', () => {
  let component: InputPasswordResetComponent;
  let fixture: ComponentFixture<InputPasswordResetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputPasswordResetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputPasswordResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
