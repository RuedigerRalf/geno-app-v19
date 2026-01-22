import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DasProgramm } from './programm';

describe('DasProgramm', () => {
  let component: DasProgramm;
  let fixture: ComponentFixture<DasProgramm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DasProgramm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DasProgramm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
