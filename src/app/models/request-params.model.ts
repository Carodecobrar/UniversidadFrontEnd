import { Materia } from "./materia.model";
import { Programa } from "./programa.model";

export interface RequestParams{
    IdUsuario?: number,
    IdRol?: number,
    Programa?: Programa,
    Materia?: Materia
}