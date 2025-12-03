import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlumnosService } from '../../../servicios/alumnos.service';
import { PlanEstudioService } from '../../../servicios/plan-estudio.service';
import { PlanEstudio } from '../../../entidades/PlanEstudio';

import { MatSelectModule } from '@angular/material/select';

@Component({
    selector: 'app-abm-alumno',
    imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule],
    templateUrl: './abm-alumno.component.html',
    styleUrl: './abm-alumno.component.css'
})

export class AbmAlumnoComponent implements OnInit {
  legajo:string = "";
  nombre:string = "";
  apellido:string = "";
  planesEstudio: PlanEstudio[] = [];
  planSeleccionado?: PlanEstudio;
  
  constructor(private servicioAlumno: AlumnosService,
    private servicioPlanEstudio: PlanEstudioService) { }

  ngOnInit(): void {
    this.servicioPlanEstudio.getPlanes().subscribe((res:any) => {
      console.log(res)
      this.planesEstudio = res;
    })
  }
  crearAlumno(){
    if (this.planSeleccionado === undefined){
      alert("Debe seleccionar una carrera")
      return
    }
    let legajoNumber = parseInt(this.legajo)
    let nuevoAlumno = this.servicioAlumno.crearAlumno(legajoNumber, this.nombre, this.apellido, this.planSeleccionado)
    
    
    this.servicioAlumno.postCrearAlumno(nuevoAlumno).subscribe((res) =>
      {
        console.log(res)
        /*this.dialog.open(NotificacionComponent, {
          data: {resultado : res}
        });
        */
      })
  }
}
