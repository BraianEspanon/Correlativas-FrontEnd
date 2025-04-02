import { Component, OnInit, ViewChild } from '@angular/core';
import { ElectivasComponent } from '../tablas/electivas/electivas.component';
import { CurricularesComponent } from '../tablas/curriculares/curriculares.component';
import {MatButtonModule} from '@angular/material/button';
import { CondicionService } from '../../servicios/condicion.service';
import { AlumnosService } from '../../servicios/alumnos.service';
import { CondicionDTO } from '../../DTOs/CondicionDTO';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [ElectivasComponent, CurricularesComponent, MatButtonModule],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent implements OnInit{
  datosCurriculares: CondicionDTO[] = [];
  datosElectivas: CondicionDTO[] = [];
  datosCompletos: CondicionDTO[] = [];
  @ViewChild(CurricularesComponent) curricularesComponent!: CurricularesComponent;

  constructor(private servicioAlumno: AlumnosService,
      private servicioCondicion: CondicionService){

  }

  ngOnInit(): void {
    this.servicioAlumno.getCondicionesAlumno(1).subscribe((res : CondicionDTO[])=>{
      this.datosCompletos = res
        for (var condicion of res){
          if (condicion.electiva){
            this.datosElectivas.push(condicion)
          }
          else{
            this.datosCurriculares.push(condicion)
          }
        }
        this.servicioCondicion.setCondiciones(res);
      })
  }

  recibirMensaje(id:string){
    //console.log("Desde electivas se recibió: " + id)
    this.curricularesComponent.buscarFila(id)
  }

  guardarCambios(){
    if (confirm("¿Está seguro que desea guardar?")){
      this.servicioAlumno.guardarCambiosCondiciones(this.datosCompletos)
      alert("Se ha guardado con éxito")
    }
  }
  
    reiniciarPlan(){
      if (confirm("¿Está seguro que desea reiniciar las condiciones del plan?")){
  
        this.servicioAlumno.reiniciarPlan().subscribe((res : CondicionDTO[])=>{
          this.datosCompletos = res
          this.servicioCondicion.setCondiciones(res);
        })
      
        alert("Se reinició el plan correctamente")
        location.reload()
      }
    }
  
}
