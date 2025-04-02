import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoDetallesComponent } from './listado-detalles.component';

describe('ListadoDetallesComponent', () => {
  let component: ListadoDetallesComponent;
  let fixture: ComponentFixture<ListadoDetallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoDetallesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListadoDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
