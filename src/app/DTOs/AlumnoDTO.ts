import { CondicionDTO } from "./CondicionDTO"

export interface AlumnoDTOResponse{
    legajo:number
    nombre:string
    apellido:string
    idCarrera:string
    nombreCarrera:string
    condiciones: CondicionDTO[]
    horasElectivas: number
}
/*
{
    "legajo": 1,
    "nombre": "Invitado",
    "apellido": "Sistemas",
    "idCarrera": "K-2023",
    "nombreCarrera": "Ingeniería en Sistemas de Información",
    "condiciones":
*/