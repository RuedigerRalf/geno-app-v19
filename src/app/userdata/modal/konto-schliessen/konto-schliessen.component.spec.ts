import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KontoSchliessenComponent } from './konto-schliessen.component';

describe('KontoSchliessenComponent', () => {
  let component: KontoSchliessenComponent;
  let fixture: ComponentFixture<KontoSchliessenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [KontoSchliessenComponent]
})
    .compileComponents();
    
    fixture = TestBed.createComponent(KontoSchliessenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
