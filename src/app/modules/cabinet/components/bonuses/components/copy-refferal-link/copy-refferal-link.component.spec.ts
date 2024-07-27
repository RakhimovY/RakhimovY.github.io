import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyRefferalLinkComponent } from './copy-refferal-link.component';

describe('CopyRefferalLinkComponent', () => {
  let component: CopyRefferalLinkComponent;
  let fixture: ComponentFixture<CopyRefferalLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CopyRefferalLinkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CopyRefferalLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
