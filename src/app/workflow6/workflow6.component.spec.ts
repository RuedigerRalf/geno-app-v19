import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Workflow6Component } from './workflow6.component';

describe('Workflow6Component', () => {
  let component: Workflow6Component;
  let fixture: ComponentFixture<Workflow6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Workflow6Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Workflow6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
