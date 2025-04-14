import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltip } from '@angular/material/tooltip';
import { CondicionDTO } from '../../../DTOs/CondicionDTO';
import { CondicionService } from '../../../servicios/condicion.service';
import { AlumnosService } from '../../../servicios/alumnos.service';
import { DetallePlan } from '../../../entidades/DetallePlan';
import { PlanEstudio } from '../../../entidades/PlanEstudio';

const CONDICIONES = [
  {id :0, estado:"Libre"}, 
  {id :1, estado:"Regular"}, 
  {id :2, estado:"Aprobado"}]

@Component({
  selector: 'app-electivas',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSelectModule, MatButtonModule, MatTooltip],
  templateUrl: './electivas.component.html',
  styleUrl: './electivas.component.css'
})

export class ElectivasComponent {
  @Input() dataSource!: CondicionDTO[];
  @Output() enviarMensaje = new EventEmitter<string>()
  condiciones = CONDICIONES
  condicionesAlumnos: any = []
  displayedColumns: string[] = ['anio', 'id', 'materia', 'modalidad', 'regulares', "aprobadas", 'cargaHoraria', 'condicion'];
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
        this.enviarMensaje.emit(id);
        //console.log("Fila no encontrada: " + id);
      }
    }, 100); // Espera 100ms para asegurarte de que las referencias estén listas
  }
  
}
