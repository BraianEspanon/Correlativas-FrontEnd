import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmMateriaComponent } from './abm-materia.component';

describe('AbmMateriaComponent', () => {
  let component: AbmMateriaComponent;
  let fixture: ComponentFixture<AbmMateriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbmMateriaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AbmMateriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
