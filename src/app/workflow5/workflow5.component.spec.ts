import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Workflow5Component } from './workflow5.component';

describe('Workflow5Component', () => {
  let component: Workflow5Component;
  let fixture: ComponentFixture<Workflow5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Workflow5Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Workflow5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
