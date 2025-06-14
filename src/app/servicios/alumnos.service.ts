import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Alumno } from '../entidades/Alumno';
import { PlanEstudio } from '../entidades/PlanEstudio';
import { CondicionDTO } from '../DTOs/CondicionDTO';
import { CondicionService } from './condicion.service';
import { Observable, of, tap } from 'rxjs';
import { AlumnoDTOResponse } from '../DTOs/AlumnoDTO';

class AlumnoDTO{
  public legajo: number;
  public nombre: string;
  public apellido: string;
  public planDeEstudio: string;

  constructor(alumno : Alumno) {
    this.legajo = alumno.getLegajo()
    this.nombre = alumno.getNombre()
    this.apellido = alumno.getApellido()
    this.planDeEstudio = alumno.getplanDeEstudio().getId()
  }
}

@Injectable({
  providedIn: 'root'
})


export class AlumnosService {

  constructor(private http: HttpClient,
    private servicioCondicion: CondicionService
  ) { }

  crearAlumno(legajo :number, nombre:string, apellido:string, planEstudio:PlanEstudio){
    let nuevoAlumno = new Alumno(legajo, nombre, apellido, planEstudio)

    return nuevoAlumno
  }
  postCrearAlumno(alumno:Alumno){
    let alumnoDTO = new AlumnoDTO(alumno)
    let cadena = JSON.stringify(alumno)
    console.log(cadena)
    return this.http.post("http://localhost:8080/alumnos/crear", alumno, { responseType: 'text' })
  }

  getCondicionesAlumno(legajo: number){
    const condicionesLocal = localStorage.getItem('alumno');

    if (condicionesLocal) {
      // Si los datos existen en Local Storage, devolverlos como Observable
      const condiciones: AlumnoDTOResponse = JSON.parse(condicionesLocal) as AlumnoDTOResponse;
      console.log(condiciones)
      return of(condiciones); // `of` crea un Observable a partir de los datos existentes
    } else {
      // Si no están en Local Storage, hacer la solicitud HTTP
      return this.leerJson().pipe(
        tap((res: AlumnoDTOResponse) => {
          // Guardar en Local Storage y en el servicio una vez que llegan los datos
          localStorage.setItem('alumno', JSON.stringify(res));
          console.log(res)
          location.reload()
        })
      );
    }
  }

  getCondicionesAlumnoHTTP(){
    return this.http.get<AlumnoDTOResponse>('http://localhost:8080/alumnos/condiciones/1')
    
  }
  guardarCambiosCondiciones(condiciones : AlumnoDTOResponse){
    localStorage.setItem('alumno', JSON.stringify(condiciones));
  }

  reiniciarPlan(){
    return this.leerJson().pipe(
      tap((res: AlumnoDTOResponse) => {
        // Guardar en Local Storage y en el servicio una vez que llegan los datos
        localStorage.setItem('alumno', JSON.stringify(res));
        console.log(res)
      })
    )
  }

  leerJson(){
    return this.http.get<AlumnoDTOResponse>('/assets/k-2023.json')
  }
}
