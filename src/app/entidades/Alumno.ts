import { Condicion } from "./Condicion";
import { PlanEstudio } from "./PlanEstudio";

export class Alumno{
    private legajo : number;
    private nombre : string;
    private apellido : string;
    private planDeEstudio: PlanEstudio;
    private condiciones? : Condicion[];

    constructor(legajo : number, nombre : string, apellido : string, planEstudio: PlanEstudio, condiciones? : Condicion[]){
        this.legajo = legajo;
        this.nombre = nombre;
        this.apellido = apellido;
        this.planDeEstudio = planEstudio;
        this.condiciones = condiciones;
    }

    getLegajo(){
        return this.legajo
    }
    getNombre(){
        return this.nombre
    }
    getApellido(){
        return this.apellido
    }
    getplanDeEstudio(){
        return this.planDeEstudio
    }
}