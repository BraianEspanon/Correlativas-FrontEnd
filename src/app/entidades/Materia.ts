export class Materia{
    private id: string;
    private nombre: string;
    private modalidad: string;
    /*
    private regulares: Materia[]
    private aprobadas: Materia[]
    private condicion: number
    private cambioAño: boolean
    */
    constructor(id:string, nombre:string, modalidad:string){
        this.id = id
        this.nombre = nombre
        this.modalidad = modalidad
        /*
        this.regulares = []
        this.aprobadas = []
        this.condicion = 0
        this.cambioAño = false
        */
    }

    toString(){
        return this.id
    }

    getNombre(){
        return this.nombre
    }
    
    getModalidad(){
        return this.modalidad
    }
    /*
    getRegulares(){
        if (this.regulares.length === 0){
            return "-"
        }
        else{
            return this.regulares.join(" - ")
        }
    }
    setRegulares(nuevasRegulares : Materia[]){
        this.regulares = nuevasRegulares
    }

    getRegularesList(){
        return this.regulares
    }
    
    getAprobadas(){
        let cantAprobadas = this.aprobadas.length
        if (cantAprobadas === 0){
            return "-"
        }
        else{
            return this.aprobadas.join(" - ")
        }
    }
    setAprobadas(nuevasAprobadas : Materia[]){
        this.aprobadas = nuevasAprobadas
    }
    
    getAprobadasList(){
        return this.aprobadas
    }
    //Sin uso
    getCondicionAsString(){
        if (this.condicion === 0){
            return "Libre"
        }
        else if (this.condicion === 1){
            return "Regular"
        }
        else if (this.condicion === 2){
            return "Aprobado"
        }
        else{
            return "Error"
        }
    }

    getCondicion(){
        return this.condicion
    }
    setCondicion(nuevaCondicion : number){
        this.condicion = nuevaCondicion
    }
    
    getCambioAño(){
        return this.cambioAño
    }
    setCambioAño(nuevoCambioAño : boolean){
        this.cambioAño = nuevoCambioAño
    }
*/
    getId(){
        return this.id
    }
/*
    esRegular(){
        return this.condicion === 1|| this.esAprobada()
    }

    esAprobada(){
        return this.condicion === 2 
    }
        */
}