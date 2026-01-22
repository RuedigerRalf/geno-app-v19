import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Symbolpaletten } from './symbolpaletten';

describe('Symbolpaletten', () => {
  let component: Symbolpaletten;
  let fixture: ComponentFixture<Symbolpaletten>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Symbolpaletten]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Symbolpaletten);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
