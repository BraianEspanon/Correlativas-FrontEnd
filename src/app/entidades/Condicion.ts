import { DetallePlan } from "./DetallePlan";

export class Condicion{
    private id : number;
    private materia: DetallePlan;
    private estado : number;

    constructor(id : number, materia: DetallePlan, estado : number){
        this.id = id;
        this.materia = materia;
        this.estado = estado;
    }
}