import { Injectable } from '@angular/core';
import { Materia } from '../entidades/Materia';
import { HttpClient } from  '@angular/common/http';
import materias from '../../materias.json'
import planes from '../../planes.json'
import condiciones from '../../condiciones.json'
import { Observable } from 'rxjs';
import { PlanEstudio } from '../entidades/PlanEstudio';
import { DetallePlan } from '../entidades/DetallePlan';

class PlanDto{
  constructor(public id: string,
    public nombre: string,
    public detalle: DetallePlan[]
  ) { }
}
@Injectable({
  providedIn: 'root'
})
export class PlanEstudioService {
  data = materias
  plan_inge = planes
  condicionAlumno = condiciones
  listaMaterias : Materia[] = []
  listaMateriasLibre : Materia[] = []
  listaMateriasRegulares : Materia[] = []
  listaMateriasAprobadas : Materia[] = []

  constructor(private http: HttpClient) { }
  
  testInConsole(){
    console.log(this.data)
  }

  postCrearPlan(plan: PlanEstudio){
    console.log(JSON.stringify(plan, null, 2));
    let planDTO : PlanDto = new PlanDto(plan.getId(), plan.getNombre(), plan.getDetalle())
    return this.http.post("http://localhost:8080/planes/crear", planDTO, { responseType: 'text' })
  }

  getPlan(idPlan: string){
    let consulta = "http://localhost:8080/planes/traer/" + idPlan
    let respuesta = this.http.get(consulta)
    return new Observable<PlanEstudio>((observer) =>{
      respuesta.subscribe((res : any) => {
        console.log(res)
        let idPlan = res.id
        let nombrePlan = res.nombre
        let detallePlan = res.detalle
  
        let nuevoPlan = new PlanEstudio(idPlan, nombrePlan)
  
        let listaDetalles :DetallePlan[] = []
        for (let i = 0; i < detallePlan.length; i++){
          let detalleIterado = detallePlan[i]
          let materiaJson = detalleIterado.materia
          let cambioAnio = detalleIterado.cambioAnio
          let electiva = detalleIterado.electiva

          let materiaNueva = new Materia(materiaJson.id, materiaJson.nombre, materiaJson.modalidad)
          let materiasRegulares = this.convertirJsonEnLista(detalleIterado.regulares)
          let materiasAprobadas = this.convertirJsonEnLista(detalleIterado.aprobadas)

          let nuevoDetalle = new DetallePlan(nuevoPlan, 
            detalleIterado.id.ordenDetalle,
            materiaNueva,
            materiasRegulares, 
            materiasAprobadas,
            cambioAnio,
            electiva
          )
          listaDetalles.push(nuevoDetalle)
        }
        nuevoPlan.setDetalle(listaDetalles);
  
        observer.next(nuevoPlan); // Emitir la lista de materias al observable
        observer.complete(); // Indicar que la operación ha finalizado
      })
    })
  }
  crearPlanDesdeJSON(JSON :any){
    let idPlan = JSON.id
    let nombrePlan = JSON.nombre
    let detallePlan = JSON.detalle

    let nuevoPlan = new PlanEstudio(idPlan, nombrePlan)

    let listaDetalles :DetallePlan[] = []
    for (let i = 0; i < detallePlan.length; i++){
      let detalleIterado = detallePlan[i]
      let materiaJson = detalleIterado.materia
      let cambioAño = detalleIterado.cambioAño
      let electiva = detalleIterado.electiva

      let materiaNueva = new Materia(materiaJson.id, materiaJson.nombre, materiaJson.modalidad)
      let materiasRegulares = this.convertirJsonEnLista(detalleIterado.regulares)
      let materiasAprobadas = this.convertirJsonEnLista(detalleIterado.aprobadas)

      let nuevoDetalle = new DetallePlan(nuevoPlan, 
        detalleIterado.id.ordenDetalle,
        materiaNueva,
        materiasRegulares, 
        materiasAprobadas,
        cambioAño,
        electiva
      )
      listaDetalles.push(nuevoDetalle)
    }
    nuevoPlan.setDetalle(listaDetalles);

    return nuevoPlan
  }
  
  getPlanes(){
    let respuesta = this.http.get("http://localhost:8080/planes/traer")
    return new Observable<PlanEstudio[]>((observer) =>{
      respuesta.subscribe((res:any) =>{
        let listaPlanes: PlanEstudio[] = []
        for (let i = 0; i < res.length; i++){
          let nuevoPlan = this.crearPlanDesdeJSON(res[i])
          listaPlanes.push(nuevoPlan)
        }
        
        observer.next(listaPlanes); 
        observer.complete();
      })
    })
  }
  guardar(){
    /*
    let json = JSON.stringify(this.listaMaterias) 
    console.log(json)
    */
   this.http.post("assets/materias.json", this.listaMaterias).subscribe((res:any)=>{
    console.log("asd")
    console.log(res.message)
   })
  }

  convertirJsonEnLista(json : any[]){
    let listaMateriasEntidad : Materia[] = []
    for (let i = 0; i< json.length ; i++){
      let materia = new Materia(json[i].id, json[i].nombre, json[i].modalidad)
      listaMateriasEntidad.push(materia)
      /*
      let materia = this.listaMaterias.find((materia: any) => materia.id === json[i].id)
      if (materia){
        listaMateriasEntidad.push(materia)
      }
      */
    }
    return listaMateriasEntidad
  }

  consultaGet(){
    return this.http.get("http://localhost:8080/materias/traer")
  }
}
