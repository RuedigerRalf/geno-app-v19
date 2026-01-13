import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DruckExportComponent } from './druck-export.component';

describe('DruckExportComponent', () => {
  let component: DruckExportComponent;
  let fixture: ComponentFixture<DruckExportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [DruckExportComponent]
})
    .compileComponents();
    
    fixture = TestBed.createComponent(DruckExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
