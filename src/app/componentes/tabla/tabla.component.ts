import { Component, OnInit, QueryList, ViewChildren, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Materia } from '../../entidades/Materia';
import { CommonModule } from '@angular/common';

import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MateriasService} from '../../servicios/materias.service'
import {MatButtonModule} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';
import { PlanEstudioService } from '../../servicios/plan-estudio.service';
import { PlanEstudio } from '../../entidades/PlanEstudio';
import { DetallePlan } from '../../entidades/DetallePlan';
import { AlumnosService } from '../../servicios/alumnos.service';
import { CondicionDTO } from '../../DTOs/CondicionDTO';
import { CondicionService } from '../../servicios/condicion.service';

const CONDICIONES = [
  {id :0, estado:"Libre"}, 
  {id :1, estado:"Regular"}, 
  {id :2, estado:"Aprobado"}]


@Component({
    selector: 'app-tabla',
    imports: [CommonModule, MatTableModule, MatSelectModule, MatButtonModule, MatTooltip],
    templateUrl: './tabla.component.html',
    styleUrl: './tabla.component.css'
})
export class TablaComponent {
  @Input() dataSource!: CondicionDTO[];
  @Input() libreCorrelatividades!: boolean;
  condiciones = CONDICIONES
  condicionesAlumnos: any = []
  displayedColumns: string[] = ['anio', 'id', 'materia', 'modalidad', 'regulares', 'aprobadas', 'cargaHoraria', 'condicion'];
  planEstudio!: PlanEstudio
  detallesPlan: DetallePlan[] = []
  @Output() enviarMensaje = new EventEmitter<string>()
  @Output() condicionCambio = new EventEmitter()

  constructor(private servicioAlumno: AlumnosService,
    private servicioCondicion: CondicionService
  ){

  }

  compararAnioAnterior(index: number, borde:boolean): boolean {
    //Borde sirve para asignar clases CSS. Porque si index=0 pero se usa para asignar clases, se debe devolver false
    if (borde && index === 0) return false;
    if (index === 0) return true;
    return this.dataSource[index].detalleAnio !== this.dataSource[index - 1].detalleAnio;
  }

  // Cuántas materias hay en el mismo año desde una posición
  contarFilasDelMismoAnio(index: number): number {
    const anioActual = this.dataSource[index].detalleAnio;
    return this.dataSource.filter(d => d.detalleAnio === anioActual).length;
  }

  setearCondiciones(res : CondicionDTO[]){
    this.dataSource = res
    this.servicioCondicion.setCondiciones(res);
  }


  onChange(opcion: any, materia : CondicionDTO){
    let nuevaCondicion = Number(opcion.value)
    materia.estado = nuevaCondicion
    this.condicionCambio.emit()

  }
  obtenerEstado(row : CondicionDTO){
    return this.servicioCondicion.getMateriaColor(row, this.libreCorrelatividades)
  }
  noPuedeCursar(materia : CondicionDTO){
    return !this.servicioCondicion.puedeCursar(materia, this.libreCorrelatividades)
  }


  clickDetalle(regulares:any){
    this.buscarFila(regulares.id)
  }

  // Referencia a todas las filas
  @ViewChildren('filaRef') filas!: QueryList<ElementRef>;
  resaltadoId: string | null = null;
  
  buscarFila(id: any) {
    this.resaltadoId = id;
  
    setTimeout(() => {
      const filaEncontrada = this.filas.find(fila => 
        fila.nativeElement.innerText.includes(id)
      );
  
      if (filaEncontrada) {
        filaEncontrada.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
  
        // Remover la clase después de 1 segundo
        setTimeout(() => {
          this.resaltadoId = null;
        }, 1000);
      } else {
        this.enviarMensaje.emit(id);
      }
    }, 100);
  }
}