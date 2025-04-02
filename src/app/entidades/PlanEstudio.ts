import { DetallePlan } from "./DetallePlan";

export class PlanEstudio{
    private id: string;
    private nombre: string;
    private detalle: DetallePlan[];
    
    constructor(id: string, nombre: string, listaDetalle: DetallePlan[] = []){
        this.id = id;
        this.nombre = nombre;
        this.detalle = listaDetalle;
    }

    setId(nuevoId:string){
        this.id = nuevoId
    }
    getId(){
        return this.id
    }
    getNombre(){
        return this.nombre
    }
    setNombre(nuevoNombre:string){
        this.nombre = nuevoNombre
    }
    getDetalle(){
        return this.detalle
    }
    setDetalle(nuevoDetalle:DetallePlan[]){
        this.detalle = nuevoDetalle
    }
}