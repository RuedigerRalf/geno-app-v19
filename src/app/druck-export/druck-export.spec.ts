import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DruckExport } from './druck-export';

describe('DruckExport', () => {
  let component: DruckExport;
  let fixture: ComponentFixture<DruckExport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DruckExport]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DruckExport);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
