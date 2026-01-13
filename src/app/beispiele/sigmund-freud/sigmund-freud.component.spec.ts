import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigmundFreudComponent } from './sigmund-freud.component';

describe('SigmundFreudComponent', () => {
  let component: SigmundFreudComponent;
  let fixture: ComponentFixture<SigmundFreudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [SigmundFreudComponent]
})
    .compileComponents();
    
    fixture = TestBed.createComponent(SigmundFreudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
