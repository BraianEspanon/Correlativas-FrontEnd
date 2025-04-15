import { Component, OnInit, ViewChild } from '@angular/core';
import { ElectivasComponent } from '../tablas/electivas/electivas.component';
import { CurricularesComponent } from '../tablas/curriculares/curriculares.component';
import {MatButtonModule} from '@angular/material/button';
import { CondicionService } from '../../servicios/condicion.service';
import { AlumnosService } from '../../servicios/alumnos.service';
import { CondicionDTO } from '../../DTOs/CondicionDTO';
import { AlumnoDTOResponse } from '../../DTOs/AlumnoDTO';
import { TablaComponent } from '../tablas/tabla/tabla.component';
import { Condicion } from '../../entidades/Condicion';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [TablaComponent, MatButtonModule],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent implements OnInit{
  datosCurriculares: CondicionDTO[] = [];
  datosElectivas: CondicionDTO[] = [];
  datosCondiciones: CondicionDTO[] = [];

  datosAlumno!: AlumnoDTOResponse;
  
  horasElectivasNecesarias!: number;
  horasElectivasCursadas!: number;
  horasElectivasFaltantes!: number;

  @ViewChild(TablaComponent) curricularesComponent!: TablaComponent;

  constructor(private servicioAlumno: AlumnosService,
      private servicioCondicion: CondicionService){

  }

  ngOnInit(): void {
    this.servicioAlumno.getCondicionesAlumno(1).subscribe((res : AlumnoDTOResponse)=>{
      this.datosAlumno = res
      this.datosCondiciones = res.condiciones
        for (var condicion of res.condiciones){
          if (condicion.electiva){
            this.datosElectivas.push(condicion)
          }
          else{
            this.datosCurriculares.push(condicion)
          }
        }
        this.servicioCondicion.setCondiciones(res.condiciones);
        
        this.obtenerHorasElecticas()
      }
    )
  }

  obtenerHorasElecticas(){
    this.horasElectivasNecesarias = this.datosAlumno.horasElectivas
    this.horasElectivasCursadas = this.calcularHorasElectivas()
    this.horasElectivasFaltantes = Math.max(0, this.horasElectivasNecesarias - this.horasElectivasCursadas);
  }

  calcularHorasElectivas(){
    let acum = 0
    for (let cond of this.datosElectivas){
      if (cond.estado === 2){
        acum += cond.cargaHoraria
      }
    }
    return acum
  }

  buscarFilaEntreTablas(id:string){
    this.curricularesComponent.buscarFila(id)
  }
  cambioCondicionElectivas(){
    this.obtenerHorasElecticas()
  }

  guardarCambios(){
    if (confirm("¿Está seguro que desea guardar?")){
      this.servicioAlumno.guardarCambiosCondiciones(this.datosAlumno)
      alert("Se ha guardado con éxito")
    }
  }
  
  reiniciarPlan(){
    if (confirm("¿Está seguro que desea reiniciar las condiciones del plan?")){

      this.servicioAlumno.reiniciarPlan().subscribe((res : AlumnoDTOResponse)=>{
        
        this.datosCondiciones = res.condiciones
        this.servicioCondicion.setCondiciones(res.condiciones);
      })
    
      alert("Se reinició el plan correctamente")
      location.reload()
    }
  }
  
}
