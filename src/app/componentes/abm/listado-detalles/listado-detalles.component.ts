import { Component, OnInit, inject } from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {DataSource} from '@angular/cdk/collections';

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
import { DetallePlan } from '../../../entidades/DetallePlan';
import { ListadoMateriasComponent } from '../listado-materias/listado-materias.component';
import {MatIconModule} from '@angular/material/icon';
import { PlanEstudio } from '../../../entidades/PlanEstudio';

export interface DialogData {
  plan: PlanEstudio
  detalles: DetallePlan[]
}

@Component({
    selector: 'app-listado-detalles',
    imports: [FormsModule, MatDialogTitle, MatCheckboxModule, MatTableModule, MatDialogContent, MatDialogActions, MatButtonModule, MatIconModule, MatDialogClose],
    templateUrl: './listado-detalles.component.html',
    styleUrl: './listado-detalles.component.css'
})

export class ListadoDetallesComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  plan: PlanEstudio | undefined;
  displayedColumns: string[] = ['materia', 'regulares', 'aprobadas', 'cambioAño', 'electiva', 'eliminar'];
  checked = false
  listaDetalles: DetallePlan[] = []
  dataSource = new DataSourceDetallePlan(this.listaDetalles);

  constructor(private servicioMateria: MateriasService,
    public dialogRef: MatDialogRef<ListadoDetallesComponent>
  ){}

  ngOnInit(): void {
    if (this.data){
      this.plan = this.data.plan
      this.listaDetalles = this.data.detalles
      this.dataSource.setData(this.listaDetalles)
    }
  }
  generarDetalle(materia : Materia){
    let index = this.listaDetalles.length + 1
    if(this.plan){
      let nuevoDetalle = new DetallePlan(this.plan, index, materia, [], [], false, false)
      this.listaDetalles.push(nuevoDetalle)
      this.dataSource.setData(this.listaDetalles)
    }
    else{
      console.log("Error creando detalle")
    }
  }

  agregarNuevoDetalle(){
    this.servicioMateria.getMateriasHttp().subscribe(res => {
      console.log(res)
      let dialogMateria = this.dialog.open(ListadoMateriasComponent, {
        data: {listaMateria : res}
      })
      
    dialogMateria.afterClosed().subscribe((result: Materia[]) => {
      if (result !== undefined && result.length === 1){
        console.log(result[0])
        this.generarDetalle(result[0])
      }
      else {
        if (typeof(result) === 'string' || result === undefined){ }
        else{
          alert("ERROR. Debe seleccionar solo una materia")
        }
      }
    });
    })
  }

  limpiar(){
    console.log(this.listaDetalles)
  }

  eliminarDetalle(detalle: DetallePlan){
    if(this.plan){
      let index = this.listaDetalles.indexOf(detalle)
      if (index >= 0) {
        this.listaDetalles.splice(index, 1);
        for (let i = 0; i < this.listaDetalles.length; i++){
          this.listaDetalles[i].setId(this.plan.getId(), "¿?")
        }
        this.dataSource.setData(this.listaDetalles);
      }
    }
  }

  agregarRegulares(detalle: any){
    console.log(this.listaDetalles)
    let listaMaterias : Materia[] = []
    let dialogMateria = this.dialog.open(ListadoMateriasComponent, {
      data: {materias : detalle.regulares,
        listaMateria : this.listaDetalles.map(detalle => detalle.getMateria())
      }
    })
    dialogMateria.afterClosed().subscribe((result: Materia[]) => {
      if (result.length > 0){
        listaMaterias = result
      }
      detalle.regulares = listaMaterias
    });
  }
  agregarAprobadas(detalle: any){
    let listaMaterias : Materia[] = []
    let dialogMateria = this.dialog.open(ListadoMateriasComponent, {
      data: {materias : detalle.aprobadas,
        listaMateria : this.listaDetalles.map(detalle => detalle.getMateria())
      }
    })
    dialogMateria.afterClosed().subscribe((result: Materia[]) => {
      if (result.length > 0){
        listaMaterias = result
      }
      detalle.aprobadas = listaMaterias
    });
  }
  confirmar(){
    console.log(this.listaDetalles)
    this.dialogRef.close(this.listaDetalles)
  }
}


class DataSourceDetallePlan extends DataSource<DetallePlan> {
  private _dataStream = new ReplaySubject<DetallePlan[]>();

  constructor(initialData: DetallePlan[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<DetallePlan[]> {
    return this._dataStream;
  }

  disconnect() {}

  setData(data: DetallePlan[]) {
    this._dataStream.next(data);
  }
}