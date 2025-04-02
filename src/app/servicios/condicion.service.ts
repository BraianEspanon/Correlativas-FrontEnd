import { Injectable } from '@angular/core';
import { CondicionDTO } from '../DTOs/CondicionDTO';


@Injectable({
  providedIn: 'root'
})

export class CondicionService {
  condiciones: { [key: string]: CondicionDTO };

  constructor() {
    this.condiciones = {}
   }

  setCondiciones(listaCondiciones: CondicionDTO[]) {
    for (var cond of listaCondiciones){
      this.addCondicion(cond)
    }
  }

  addCondicion(cond: CondicionDTO){
    this.condiciones[cond.condicionId] = cond
  }

  getMateriaColor(materia: CondicionDTO){
    let condicion = materia.estado
    if (condicion === 0){
      if (this.puedeCursar(materia)){
        return {'background-color':'lightgoldenrodyellow'}
      }
      else{
        return {'background-color':'lightcoral'}
      }
    }
    else if (condicion === 1){
      return {'background-color':'lightblue'}
    } 
    else if (condicion === 2){
      return {'background-color':'lightgreen'}
    }
    else{
      return {'background-color':'red'}
    }
  }
    
  puedeCursar(materia:CondicionDTO){
    let regulares = materia.detalleRegulares
    let aprobadas = materia.detalleAprobadas

    
    let banderaRegulares = true
    let banderaAprobadas = true
  
    for (var reg of regulares){
      for (var cond of Object.values(this.condiciones)){
        if (cond.detalleMateria.id === reg.id){
          if (cond.estado !== 1 && cond.estado !== 2){
            banderaRegulares = false
            break;
          }
        }
      };
      if (!banderaRegulares) break;
    }
    
    for (var apro of aprobadas){
      for (var cond of Object.values(this.condiciones)){
        if (cond.detalleMateria.id === apro.id){
          if (cond.estado !== 2){
            banderaAprobadas = false
            break;
          }
        }
      };
      if (!banderaAprobadas) break;
    }

    return banderaRegulares && banderaAprobadas
  }
}
