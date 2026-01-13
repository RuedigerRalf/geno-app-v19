import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeispieleComponent } from './beispiele.component';

describe('BeispieleComponent', () => {
  let component: BeispieleComponent;
  let fixture: ComponentFixture<BeispieleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [BeispieleComponent]
})
    .compileComponents();
    
    fixture = TestBed.createComponent(BeispieleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
