interface MateriaDTO{
    id: string,
    modalidad: string,
    nombre: string
}

export interface CondicionDTO{
    condicionId: string,
    detalleAprobadas: MateriaDTO[],
    detalleRegulares: MateriaDTO[], 
    detalleMateria: MateriaDTO,
    detalleCambioAnio: boolean, 
    estado: number,
    electiva: boolean,
    detalleAnio: number
}