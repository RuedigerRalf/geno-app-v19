import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MustermannComponent } from './mustermann.component';

describe('MustermannComponent', () => {
  let component: MustermannComponent;
  let fixture: ComponentFixture<MustermannComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [MustermannComponent]
})
    .compileComponents();
    
    fixture = TestBed.createComponent(MustermannComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
