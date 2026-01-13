import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeinrichViiiComponent } from './heinrich-viii.component';

describe('HeinrichViiiComponent', () => {
  let component: HeinrichViiiComponent;
  let fixture: ComponentFixture<HeinrichViiiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [HeinrichViiiComponent]
})
    .compileComponents();
    
    fixture = TestBed.createComponent(HeinrichViiiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
