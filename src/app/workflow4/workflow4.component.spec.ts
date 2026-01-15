import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Workflow4Component } from './workflow4.component';

describe('Workflow4Component', () => {
  let component: Workflow4Component;
  let fixture: ComponentFixture<Workflow4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Workflow4Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Workflow4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
