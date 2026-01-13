import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Workflow3Component } from './workflow3.component';

describe('Workflow3Component', () => {
  let component: Workflow3Component;
  let fixture: ComponentFixture<Workflow3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Workflow3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Workflow3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
