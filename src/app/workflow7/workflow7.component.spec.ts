import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Workflow7Component } from './workflow7.component';

describe('Workflow7Component', () => {
  let component: Workflow7Component;
  let fixture: ComponentFixture<Workflow7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Workflow7Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Workflow7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
