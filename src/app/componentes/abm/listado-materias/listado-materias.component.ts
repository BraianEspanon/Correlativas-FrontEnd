import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';

import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MateriasService } from '../../../servicios/materias.service';
import { Materia } from '../../../entidades/Materia';

export interface DialogData {
  listaMateria: Materia[];
  materias: Materia[]
}

@Component({
  selector: 'app-listado-materias',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCheckboxModule, FormsModule, MatButtonModule, 
    MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle],
  templateUrl: './listado-materias.component.html',
  styleUrl: './listado-materias.component.css'
})
export class ListadoMateriasComponent implements OnInit {
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  listaMaterias : Materia[] = [];
  displayedColumns: string[] = ['checkBox', 'id', 'nombre'];
  selectedMap: { [id: string]: boolean } = {};
  constructor(private servicioMateria: MateriasService, 
              public dialogRef: MatDialogRef<ListadoMateriasComponent>){
  }

  ngOnInit(){
    this.listaMaterias = this.data.listaMateria;
    
    if (this.data.materias){
      for (let i = 0; i < this.data.materias.length; i++){
        let idMateriaSeleccionada = this.data.materias[i].getId()
        this.toggleSelection(idMateriaSeleccionada)
      }
    }
  }

  toggleSelection(id: string) {
    this.selectedMap[id] = !this.selectedMap[id]; // Alternar el estado de selección
  }
  limpiarSelecciones(){
    this.selectedMap = {}
  }
 devolverSelecciones(){
  const materiasSeleccionadas = this.buscarMateriasSeleccionadas()
  this.dialogRef.close(materiasSeleccionadas);
 }

 buscarMateriasSeleccionadas(){
   let listaMateriasEncontradas: Materia[] = []
   for (const key of Object.keys(this.selectedMap)) {
    const idMateria = key; // Convertir la clave a número si es necesario
    if (this.selectedMap[idMateria]) {
      let materiaEncontrada = this.listaMaterias.find((materia: Materia) => materia.getId() === idMateria)
      if (materiaEncontrada){ 
        listaMateriasEncontradas.push(materiaEncontrada)
      }
    } 
  } 
  return listaMateriasEncontradas
  }
}
