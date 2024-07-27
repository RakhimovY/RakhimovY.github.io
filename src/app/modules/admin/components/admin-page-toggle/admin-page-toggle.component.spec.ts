import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPageToggleComponent } from './admin-page-toggle.component';

describe('AdminPageToggleComponent', () => {
  let component: AdminPageToggleComponent;
  let fixture: ComponentFixture<AdminPageToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPageToggleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminPageToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
