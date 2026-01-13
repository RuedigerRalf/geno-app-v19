import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryDialog2Component } from './gallery-dialog2.component';

describe('GalleryDialog2Component', () => {
  let component: GalleryDialog2Component;
  let fixture: ComponentFixture<GalleryDialog2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalleryDialog2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GalleryDialog2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
