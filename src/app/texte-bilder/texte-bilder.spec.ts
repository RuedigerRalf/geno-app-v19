import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TexteBilder } from './texte-bilder';

describe('TexteBilder', () => {
  let component: TexteBilder;
  let fixture: ComponentFixture<TexteBilder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TexteBilder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TexteBilder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
