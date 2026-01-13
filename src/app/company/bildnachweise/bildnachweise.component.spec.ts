import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BildnachweiseComponent } from './bildnachweise.component';

describe('BildnachweiseComponent', () => {
  let component: BildnachweiseComponent;
  let fixture: ComponentFixture<BildnachweiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [BildnachweiseComponent]
})
    .compileComponents();
    
    fixture = TestBed.createComponent(BildnachweiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
