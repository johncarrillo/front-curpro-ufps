import { AlquilerAula } from "./alquiler-aula";
import { ApoyosLogistico } from "./apoyos-logistico";
import { CoordinacionOfertasAcedemica } from "./coordinacion-ofertas-acedemica";
import { ImpresoPublicacion } from "./impreso-publicacion";
import { MaterialSuministro } from "./material-suministro";
import { OtroAnexo } from "./otro-anexo";
import { ServiciosEducativos } from "./servicios-educativos";

export class ItemGasto {
    id:number;
    nombre:string;
    consecutivo:number;
    valor:number;
    itemsGasto:ItemGasto[];
    serviciosEducativos:ServiciosEducativos[];
    coordinacionOfertasAcademicas:CoordinacionOfertasAcedemica[];
    apoyosLogisticos: ApoyosLogistico[];
    materialesSuministro:MaterialSuministro[];
    impresosPublicaciones:ImpresoPublicacion[];
    alquilerAulas:AlquilerAula[];
    otrosAnexos:OtroAnexo[];
}
