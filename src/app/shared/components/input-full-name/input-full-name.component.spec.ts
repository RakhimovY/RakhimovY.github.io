import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFullNameComponent } from './input-full-name.component';

describe('InputFullNameComponent', () => {
  let component: InputFullNameComponent;
  let fixture: ComponentFixture<InputFullNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputFullNameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputFullNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
