import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UeberblickComponent } from './ueberblick.component';

describe('UeberblickComponent', () => {
  let component: UeberblickComponent;
  let fixture: ComponentFixture<UeberblickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [UeberblickComponent]
})
    .compileComponents();
    
    fixture = TestBed.createComponent(UeberblickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
