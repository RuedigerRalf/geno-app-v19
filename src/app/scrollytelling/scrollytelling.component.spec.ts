import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollytellingComponent } from './scrollytelling.component';

describe('ScrollytellingComponent', () => {
  let component: ScrollytellingComponent;
  let fixture: ComponentFixture<ScrollytellingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrollytellingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrollytellingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
