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

@Component({
  selector: 'app-abm-materia',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule],
  templateUrl: './abm-materia.component.html',
  styleUrl: './abm-materia.component.css'
})
export class AbmMateriaComponent implements OnInit{
  readonly dialog = inject(MatDialog);

  id:string = "";
  nombre:string = "";
  modalidad:string = "";
  materiasRegulares:Materia[] = [];
  materiasAprobadas:Materia[] = [];
  regularesSeleccionadas: string = "";
  aprobadasSeleccionadas: string = "";
  constructor(private servicioMateria: MateriasService){

  }

  ngOnInit(): void {
    this.calcularRegularesSeleccionadas()
    this.calcularAprobadasSeleccionadas()
  }

  agregarRegulares(){
    let regulares = this.dialog.open(ListadoMateriasComponent, {
      data: {materias : this.materiasRegulares}
    });
    regulares.afterClosed().subscribe((result: Materia[]) => {
      if (result){
        console.log(result)
        this.materiasRegulares = result
        this.calcularRegularesSeleccionadas()
      }
      else{
        console.log("No se seleccionó ninguna materia que deba estar regular")
      }
    });
  }
  agregarAprobadas(){
    let aprobadas = this.dialog.open(ListadoMateriasComponent, {
      data: {materias : this.materiasAprobadas}
    });
    aprobadas.afterClosed().subscribe((result: Materia[]) => {
      if (result){
        console.log(result)
        this.materiasAprobadas = result
      }
      else{
        console.log("No se seleccionó ninguna materia que deba estar aprobada")
      }
      this.calcularAprobadasSeleccionadas()
    });
  }
  /*
  Codigo en desuso por quitar responsabilidad de correlativas a las materias
  crearMateria(){
    let materiaCreada = this.servicioMateria.crearMateria(this.id, this.nombre, this.modalidad, this.materiasRegulares, this.materiasAprobadas)
    console.log(materiaCreada)
    this.servicioMateria.postCrearMateria(materiaCreada).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.error("Error al crear la materia:", error);
      });
  }
*/
  crearMateria(){
    let materiaCreada = this.servicioMateria.crearMateria(this.id, this.nombre, this.modalidad)

    this.servicioMateria.postCrearMateria(materiaCreada).subscribe((res) =>
      {
        this.dialog.open(NotificacionComponent, {
          data: {resultado : res}
        });
    })
  }
  calcularRegularesSeleccionadas(){
    this.regularesSeleccionadas = "Materias: " + this.materiasRegulares.length
  }
  calcularAprobadasSeleccionadas(){
    this.aprobadasSeleccionadas = "Materias: " + this.materiasAprobadas.length
  }
}
