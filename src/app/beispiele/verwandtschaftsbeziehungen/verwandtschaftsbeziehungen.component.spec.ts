import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerwandtschaftsbeziehungenComponent } from './verwandtschaftsbeziehungen.component';

describe('VerwandtschaftsbeziehungenComponent', () => {
  let component: VerwandtschaftsbeziehungenComponent;
  let fixture: ComponentFixture<VerwandtschaftsbeziehungenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [VerwandtschaftsbeziehungenComponent]
})
    .compileComponents();
    
    fixture = TestBed.createComponent(VerwandtschaftsbeziehungenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
