import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextblockBilderComponent } from './textblock-bilder.component';

describe('TextblockBilderComponent', () => {
  let component: TextblockBilderComponent;
  let fixture: ComponentFixture<TextblockBilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [TextblockBilderComponent]
})
    .compileComponents();
    
    fixture = TestBed.createComponent(TextblockBilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
