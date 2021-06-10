import { ItemGasto } from "./item-gasto";
import { ItemIngreso } from "./item-ingreso";

export class Presupuesto {
    id:number;
    valorIngreso:number;
    valorGasto:number;
    utilidad:number;
    fondoInvestigacionUniversitario:number;
    utilidadNeta:number;
    itemGasto:ItemGasto;
    itemIngreso:ItemIngreso;
}
