import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnischeVoraussetzungenComponent } from './technische-voraussetzungen.component';

describe('TechnischeVoraussetzungenComponent', () => {
  let component: TechnischeVoraussetzungenComponent;
  let fixture: ComponentFixture<TechnischeVoraussetzungenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [TechnischeVoraussetzungenComponent]
})
    .compileComponents();
    
    fixture = TestBed.createComponent(TechnischeVoraussetzungenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
