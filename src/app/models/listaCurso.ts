import { EstadoCurso } from "./estado-curso";
import { TipoCurso } from "./tipo-curso";

export class ListaCursos{
    id:number;
    tipoCurso: TipoCurso;
    nombre: string;
    descripcion: string;
    dependencia:string;
    cantidadHoras:number;
    fechaInicio:string;
    fechaLimitePago:string;
    fechaLimiteRetiro:string;
    fechaFin:string;
    idPresupuesto:number;
    justifiacionRechazo:string;
    estadoCurso:EstadoCurso;
    creador:string;
    otroTipoCurso:string;
    costo:number;
}