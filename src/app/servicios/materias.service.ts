import { Injectable } from '@angular/core';
import { Materia } from '../entidades/Materia';
import { HttpClient } from  '@angular/common/http';
import materias from '../../materias.json'
import planes from '../../planes.json'
import condiciones from '../../condiciones.json'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class MateriasService {
  constructor (private http: HttpClient) {}

  crearMateria(id : string, nombre: string, modalidad : string){
    let nuevaMateria = new Materia(id, nombre, modalidad)

    return nuevaMateria
  }

  postCrearMateria(materia: Materia){
    return this.http.post("http://localhost:8080/materias/crear", materia, { responseType: 'text' })
  }

  getMateriasHttp(){
    let listaMaterias:Materia[] = []

    return new Observable<Materia[]>((observer) =>{

      this.consultaGet().subscribe((res:any)=>{
        for (let i = 0; i< res.length ; i++){
          let materiaJson = res[i]

          
          let nuevaMateria = this.crearMateria(materiaJson.id, materiaJson.nombre, materiaJson.modalidad)
          listaMaterias.push(nuevaMateria)
        }
        observer.next(listaMaterias); // Emitir la lista de materias al observable
        observer.complete(); // Indicar que la operación ha finalizado
        //console.log("MATERIAS OBTENIDAS")
      })
    })
  }

  consultaGet(){
    return this.http.get("http://localhost:8080/materias/traer")
  }
  
}
