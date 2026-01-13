import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmNewEmailComponent } from './confirm-new-email.component';

describe('ConfirmNewEmailComponent', () => {
  let component: ConfirmNewEmailComponent;
  let fixture: ComponentFixture<ConfirmNewEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ConfirmNewEmailComponent]
})
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmNewEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
