import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonaldTrumpComponent } from './donald-trump.component';

describe('DonaldTrumpComponent', () => {
  let component: DonaldTrumpComponent;
  let fixture: ComponentFixture<DonaldTrumpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [DonaldTrumpComponent]
})
    .compileComponents();
    
    fixture = TestBed.createComponent(DonaldTrumpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
