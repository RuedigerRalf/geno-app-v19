import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dienstleistung } from './dienstleistung';

describe('Dienstleistung', () => {
  let component: Dienstleistung;
  let fixture: ComponentFixture<Dienstleistung>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dienstleistung]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dienstleistung);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
