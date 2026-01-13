import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentationDialog2Component } from './presentation-dialog2.component';

describe('PresentationDialog2Component', () => {
  let component: PresentationDialog2Component;
  let fixture: ComponentFixture<PresentationDialog2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PresentationDialog2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PresentationDialog2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
