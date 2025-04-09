import { Component, OnInit, QueryList, ViewChildren, ElementRef, Input } from '@angular/core';
import { Materia } from '../../../entidades/Materia';
import { CommonModule } from '@angular/common';

import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MateriasService} from '../../../servicios/materias.service'
import {MatButtonModule} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';
import { PlanEstudioService } from '../../../servicios/plan-estudio.service';
import { PlanEstudio } from '../../../entidades/PlanEstudio';
import { DetallePlan } from '../../../entidades/DetallePlan';
import { AlumnosService } from '../../../servicios/alumnos.service';
import { CondicionDTO } from '../../../DTOs/CondicionDTO';
import { CondicionService } from '../../../servicios/condicion.service';

const CONDICIONES = [
  {id :0, estado:"Libre"}, 
  {id :1, estado:"Regular"}, 
  {id :2, estado:"Aprobado"}]

@Component({
  selector: 'app-curriculares',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSelectModule, MatButtonModule, MatTooltip],
  templateUrl: './curriculares.component.html',
  styleUrl: './curriculares.component.css'
})
export class CurricularesComponent{
  @Input() dataSource!: CondicionDTO[];
  condiciones = CONDICIONES
  condicionesAlumnos: any = []
  displayedColumns: string[] = ['anio', 'id', 'materia', 'modalidad', 'regulares', 'aprobadas', 'cargaHoraria', 'condicion'];
  planEstudio!: PlanEstudio
  detallesPlan: DetallePlan[] = []

  constructor(private servicioAlumno: AlumnosService,
    private servicioCondicion: CondicionService
  ){

  }

  compararAnioAnterior(index: number, borde:boolean): boolean {
    //Borde sirve para asignar clases CSS. Porque si index=0 pero se usa para asignar clases, se debe devolver false
    if (borde && index === 0) return false;
    if (index === 0) return true;
    return this.dataSource[index].anio !== this.dataSource[index - 1].anio;
  }

  // Cuántas materias hay en el mismo año desde una posición
  contarFilasDelMismoAnio(index: number): number {
    const anioActual = this.dataSource[index].anio;
    return this.dataSource.filter(d => d.anio === anioActual).length;
  }

  setearCondiciones(res : CondicionDTO[]){
    this.dataSource = res
    this.servicioCondicion.setCondiciones(res);
  }


  onChange(opcion: any, materia : CondicionDTO){
    let nuevaCondicion = Number(opcion.value)
    materia.estado = nuevaCondicion
  }
  obtenerEstado(row : CondicionDTO){
    return this.servicioCondicion.getMateriaColor(row)
  }
  noPuedeCursar(materia : CondicionDTO){
    return !this.servicioCondicion.puedeCursar(materia)
  }


  clickDetalle(regulares:any){
    this.buscarFila(regulares.nombre)
  }

  // Referencia a todas las filas
  @ViewChildren('filaRef') filas!: QueryList<ElementRef>;

  // Método para buscar una fila y hacer scroll hasta ella
  buscarFila(id: any) {
    setTimeout(() => {
    const filaEncontrada = this.filas.find(fila => 
      fila.nativeElement.innerText.includes(id)
    );
      if (filaEncontrada) {
       filaEncontrada.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
       // Agregar la clase para la animación
      filaEncontrada.nativeElement.classList.add('fila-resaltada');

    // Remover la clase después de 1 segundo
    setTimeout(() => {
      filaEncontrada.nativeElement.classList.remove('fila-resaltada');
    }, 1000);

     } else {
        console.log("Fila no encontrada: " + id);
      }
    }, 100); // Espera 100ms para asegurarte de que las referencias estén listas
  }
  
}
