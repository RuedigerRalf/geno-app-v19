import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DarstellungComponent } from './darstellung.component';

describe('DarstellungComponent', () => {
  let component: DarstellungComponent;
  let fixture: ComponentFixture<DarstellungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DarstellungComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DarstellungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
