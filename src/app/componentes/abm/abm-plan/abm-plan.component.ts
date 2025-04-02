import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

import { ListadoMateriasComponent } from '../listado-materias/listado-materias.component';
import { FormsModule } from '@angular/forms';
import { Materia } from '../../../entidades/Materia';
import { MateriasService } from '../../../servicios/materias.service';
import { NotificacionComponent } from '../notificacion/notificacion.component';
import { DetallePlan } from '../../../entidades/DetallePlan';
import { ListadoDetallesComponent } from '../listado-detalles/listado-detalles.component';
import { PlanEstudio } from '../../../entidades/PlanEstudio';
import { PlanEstudioService } from '../../../servicios/plan-estudio.service';

@Component({
  selector: 'app-abm-plan',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule],
  templateUrl: './abm-plan.component.html',
  styleUrl: './abm-plan.component.css'
})
export class AbmPlanComponent {
  readonly dialog = inject(MatDialog);
  id:string = "";
  nombre:string = "";
  detalles: DetallePlan[] = []
  cantDetalles: string = this.calcCantDetalles(0)
  plan = new PlanEstudio(this.id, this.nombre, [])

  constructor(private servicioPlan: PlanEstudioService ){

  }
  generarDetalles(){
    this.plan.setId(this.id)
    this.plan.setNombre(this.nombre)
    
    let dialogDetalles = this.dialog.open(ListadoDetallesComponent, {
      data: {detalles : this.detalles,
        plan: this.plan
      }
    })
    dialogDetalles.afterClosed().subscribe((result) => {
      let cantidadDetallesCreados = 0
      if (result !== undefined){
        cantidadDetallesCreados = result.length
        if (cantidadDetallesCreados > 0){
          this.detalles = result
        }
      }
      this.cantDetalles = this.calcCantDetalles(cantidadDetallesCreados)
    })
  }

  calcCantDetalles(cant: number){
    return "" + cant + " materias"
  }
  crearPlan(){
    this.plan.setId(this.id)
    this.plan.setNombre(this.nombre)
    this.plan.setDetalle(this.detalles)

    this.servicioPlan.postCrearPlan(this.plan).subscribe((res) =>{
      console.log(res)
    })
  }
}
