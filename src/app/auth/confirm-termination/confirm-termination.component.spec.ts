import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmTerminationComponent } from './confirm-termination.component';

describe('ConfirmTerminationComponent', () => {
  let component: ConfirmTerminationComponent;
  let fixture: ComponentFixture<ConfirmTerminationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ConfirmTerminationComponent]
})
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmTerminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
