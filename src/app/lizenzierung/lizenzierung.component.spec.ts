import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LizenzierungComponent } from './lizenzierung.component';

describe('LizenzierungComponent', () => {
  let component: LizenzierungComponent;
  let fixture: ComponentFixture<LizenzierungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [LizenzierungComponent]
})
    .compileComponents();
    
    fixture = TestBed.createComponent(LizenzierungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
