import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurricularesComponent } from './curriculares.component';

describe('CurricularesComponent', () => {
  let component: CurricularesComponent;
  let fixture: ComponentFixture<CurricularesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurricularesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CurricularesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
