import { Materia } from "./materia.model";

export interface Programa{
    IdPrograma : number,
    Nombre : string,
    Materias: Materia[]
}