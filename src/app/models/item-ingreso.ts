import { InscripcionMatricula } from "./inscripcion-matricula";

export class ItemIngreso {
    id:number;
    nombre:string;
    consecutivo:number;
    valor:number;
    itemIngreso:ItemIngreso[];
    inscripcionMatricula:InscripcionMatricula[];
}
