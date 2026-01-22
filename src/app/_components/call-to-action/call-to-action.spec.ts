import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallToActionRegister } from './call-to-action';

describe('CallToAction', () => {
  let component: CallToActionRegister;
  let fixture: ComponentFixture<CallToActionRegister>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CallToActionRegister]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallToActionRegister);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
