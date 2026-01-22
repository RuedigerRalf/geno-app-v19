import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallToActionContact } from './call-to-action-contact';

describe('CallToActionContact', () => {
  let component: CallToActionContact;
  let fixture: ComponentFixture<CallToActionContact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CallToActionContact]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallToActionContact);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
