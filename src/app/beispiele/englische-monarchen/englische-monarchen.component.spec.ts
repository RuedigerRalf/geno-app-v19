import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnglischeMonarchenComponent } from './englische-monarchen.component';

describe('EnglischeMonarchenComponent', () => {
  let component: EnglischeMonarchenComponent;
  let fixture: ComponentFixture<EnglischeMonarchenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [EnglischeMonarchenComponent]
})
    .compileComponents();
    
    fixture = TestBed.createComponent(EnglischeMonarchenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
