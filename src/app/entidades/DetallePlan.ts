import { Materia } from "./Materia";
import { PlanEstudio } from "./PlanEstudio";

class DetallePlanId{
    private planId : string;
    private materiaId : string;

    constructor(planId: string, materiaId: string){
        //console.log(planId + "|"+ ordenDetalle)
        this.planId = planId;
        this.materiaId = materiaId;
    }
    
    getPlanId(){
        return this.planId
    }
    
    getmateriaId(){
        return this.materiaId
    }
    toString(){
        return this.materiaId;
    }
}
export class DetallePlan{
    private id: DetallePlanId;
    private materia: Materia;
    private regulares: Materia[];
    private aprobadas: Materia[];
    public cambioAnio: boolean;
    public electiva: boolean;
    //private plan: PlanEstudio;

    constructor(plan: PlanEstudio, ordenDetalle : number, materia: Materia, regulares: Materia[], aprobadas: Materia[], cambioAnio: boolean, electiva: boolean){
        //this.plan = plan
        this.id = new DetallePlanId(plan.getId(), materia.getId())
        this.materia = materia;
        this.regulares = regulares
        this.aprobadas = aprobadas
        this.cambioAnio = cambioAnio
        this.electiva = electiva
    }

    getId(){
        return this.id;
    }
    getIdToString(){
        return this.id.toString();
    }
    setId(planId : string, ordenDetalle : string){
        this.id = new DetallePlanId(planId, ordenDetalle);
    }
    getMateria(){
        return this.materia;
    }
    getRegulares(){
        return this.regulares;
    }
    
    getRegularesString(){
        return this.regulares.join(" - ");
    }
    
    getAprobadas(){
        return this.aprobadas;
    }

    getAprobadasString(){
        return this.aprobadas.join(" - ");
    }
    
    getCantRegulares(){
        return this.regulares.length;
    }
    
    getCantAprobadas(){
        return this.aprobadas.length;
    }
    
    getCambioAnio(){
        return this.cambioAnio;
    }
}