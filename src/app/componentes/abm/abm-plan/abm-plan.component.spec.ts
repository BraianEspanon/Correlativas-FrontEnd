import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmPlanComponent } from './abm-plan.component';

describe('AbmPlanComponent', () => {
  let component: AbmPlanComponent;
  let fixture: ComponentFixture<AbmPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbmPlanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AbmPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
