import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SymbolpalettenComponent } from './symbolpaletten.component';

describe('SymbolpalettenComponent', () => {
  let component: SymbolpalettenComponent;
  let fixture: ComponentFixture<SymbolpalettenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [SymbolpalettenComponent]
})
    .compileComponents();
    
    fixture = TestBed.createComponent(SymbolpalettenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
