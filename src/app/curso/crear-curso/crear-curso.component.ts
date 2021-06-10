import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbAccordionConfig,  NgbDate,    NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as Chartist from 'chartist';
import { ServiciosEducativos } from '../../models/servicios-educativos';
import { InscripcionMatricula } from '../../models/inscripcion-matricula';
import { ItemIngreso } from '../../models/item-ingreso';
import { CoordinacionOfertasAcedemica } from '../../models/coordinacion-ofertas-acedemica';
import { ApoyosLogistico } from '../../models/apoyos-logistico';
import { ImpresoPublicacion } from '../../models/impreso-publicacion';
import { AlquilerAula } from '../../models/alquiler-aula';
import { OtroAnexo } from '../../models/otro-anexo';
import { Presupuesto } from '../../models/presupuesto';
import { MaterialSuministro } from '../../models/material-suministro';
import { CrearCursoService } from '../../services/crear-curso.service';
import { CursoSave } from '../../models/curso-save';
import { ItemGasto } from '../../models/item-gasto';
import { ActivatedRoute } from '@angular/router';
import { UploadServiceService } from '../../services/upload-service.service';
import { TipoCurso } from '../../models/tipo-curso';
import { EstadoCurso } from '../../models/estado-curso';


@Component({
  selector: 'app-crear-curso',
  templateUrl: './crear-curso.component.html',
  styleUrls: ['./crear-curso.component.css']
})
export class CrearCursoComponent implements OnInit {

  cursoForm: FormGroup;
  tiposOfertas: any[]=[];
  estadoscurso:EstadoCurso[];
  estaCreando: boolean = true;
  @ViewChild('cursoFormView', { static: false }) viewCursoForm: NgForm;
  preupuesto: Presupuesto = new Presupuesto()

  curso: CursoSave = new CursoSave()






  constructor(config: NgbAccordionConfig, private crearCursoService: CrearCursoService,
    private _route: ActivatedRoute, private uploadFile:UploadServiceService) {
    config.closeOthers = true;
    config.type = 'primary';
    this.preupuesto.itemGasto = new ItemGasto()
    this.preupuesto.itemGasto.itemsGasto = []
    let gastosprofesionales = new ItemGasto()
    gastosprofesionales.nombre = 'Servicios Profesionales'
    this.preupuesto.itemGasto.itemsGasto.push(gastosprofesionales)
    let gastosGenerales = new ItemGasto()
    gastosGenerales.nombre = 'Gastos Generales'
    this.preupuesto.itemGasto.itemsGasto.push(gastosGenerales)
    let otrosGastos = new ItemGasto()
    otrosGastos.nombre = 'Otros Gastos'
    this.preupuesto.itemGasto.itemsGasto.push(otrosGastos)
    let gastosAdministracion = new ItemGasto()
    gastosAdministracion.nombre = 'Gastos Administracion'
    this.preupuesto.itemGasto.itemsGasto.push(gastosAdministracion)


  }

  ngOnInit(): void {
    this.crearCursoService.tipos().subscribe(data=>{
      console.log('--------data-----------')
    console.log(data)
      data.forEach(element=>{
        this.tiposOfertas.push({label:element.nombre, value:element.id})
      })
    })
    console.log('--------tipos-----------')
    console.log(this.tiposOfertas)
    this._route.paramMap.subscribe(params => {
      if (params.get('id') !== null) {
        this.buscar(params.get('id'))
      }
    })
    this.cursoForm = new FormGroup({
      id: new FormControl(),
      nombre: new FormControl('', Validators.required),
      idTipoCurso: new FormControl('', Validators.required),
      otroTipoCurso: new FormControl(''),
      imagen: new FormControl(),
      descripcion: new FormControl('', Validators.required),
      fechaInicio: new FormControl('', Validators.required),
      fechaFin: new FormControl('', Validators.required),
      cantidadHoras: new FormControl('', Validators.required),
      fechaLimitePago: new FormControl(''),
      fechaLimiteRetiro: new FormControl('', Validators.required),
    });

  }
  get f() { return this.cursoForm.controls; }
  selectFile(event){
    let fileName= event.target.files[0].name
    this.cursoForm.get('imagen').setValue(fileName)
    let fileSeleccionado=event.target.files[0]
    this.uploadFile.guardar(fileSeleccionado).subscribe(data=>{

    }, err=>{

    })

  }

  activeSubmitCursoForm() {
    this.curso.cantidadHoras=this.cursoForm.get('cantidadHoras').value
    this.curso.nombre=this.cursoForm.get('nombre').value
    this.curso.descripcion=this.cursoForm.get('descripcion').value
    this.curso.idTipoCurso=this.cursoForm.get('idTipoCurso').value
    this.curso.imagen=this.cursoForm.get('imagen').value
    let fI
    let fechaI=this.cursoForm.get('fechaInicio').value
    fI=fechaI.year +"-" +((fechaI.month >10) ? fechaI.month:"0"+fechaI.month )+"-" +((fechaI.day >10) ? fechaI.day:"0"+fechaI.day)
    this.curso.fechaInicio=fI
    let fT
    let fechaT=this.cursoForm.get('fechaFin').value
    fT=fechaT.year +"-" +((fechaT.month >10) ? fechaT.month:"0"+fechaT.month )+"-" +((fechaT.day >10) ? fechaT.day:"0"+fechaT.day)
    this.curso.fechaFin=fT
    let fP
    let fechaP=this.cursoForm.get('fechaLimitePago').value
    fP=fechaP.year +"-" +((fechaP.month >10) ? fechaP.month:"0"+fechaP.month )+"-" +((fechaP.day >10) ? fechaP.day:"0"+fechaP.day)
    this.curso.fechaLimitePago=fP
    let fR
    let fechaR=this.cursoForm.get('fechaLimitePago').value
    fR=fechaR.year +"-" +((fechaR.month >10) ? fechaR.month:"0"+fechaR.month )+"-" +((fechaR.day >10) ? fechaR.day:"0"+fechaR.day)
    this.curso.fechaLimiteRetiro=fR
    console.log('----------curso Form-----------')
    console.log(this.cursoForm.value)
    console.log('----------curso-----------')
    console.log(this.curso)
    this.estaCreando = false
  }

  receiveIngreso($event) {
    let itemIngreso: ItemIngreso = new ItemIngreso()
    let matricula: InscripcionMatricula[] = []
    matricula = $event;
    let total = 0;
    itemIngreso.nombre = 'matricula'
    itemIngreso.inscripcionMatricula = matricula
    matricula.forEach(element => {
      total = total + element.valorTotal
    });
    itemIngreso.valor = total
    this.preupuesto.itemIngreso = itemIngreso
    console.log('---------------presupuesto------------')
    console.log(this.preupuesto.itemIngreso)
  }
  receiveMaterial($event) {
    this.preupuesto.itemGasto.itemsGasto.forEach(element => {
      if (element.nombre === 'Gastos Generales') {
        let itemGasto: ItemGasto = new ItemGasto()
        itemGasto.nombre = 'Materiales y Suministros'
        let materiales: MaterialSuministro[] = []
        materiales = $event
        itemGasto.materialesSuministro = materiales
        element.materialesSuministro = itemGasto.materialesSuministro
        return
      }
      element.consecutivo=2
    })

  }
  receiveHonor($event) {

    this.preupuesto.itemGasto.itemsGasto.forEach(element => {
      if (element.nombre === 'Servicios Profesionales') {
        let itemGasto: ItemGasto = new ItemGasto()
        itemGasto.nombre = 'Honorarios'
        let honorarios: ServiciosEducativos[] = []
        honorarios = $event
        itemGasto.serviciosEducativos = honorarios
        element.serviciosEducativos = itemGasto.serviciosEducativos
        return
      }
      element.consecutivo=1
    })

  }
  receiveCoordinacion($event) {
    this.preupuesto.itemGasto.itemsGasto.forEach(element => {
      if (element.nombre === 'Servicios Profesionales') {
        let itemGasto: ItemGasto = new ItemGasto()
        itemGasto.nombre = 'Coordinacion'
        let coordinacion: CoordinacionOfertasAcedemica[] = []
        coordinacion = $event
        itemGasto.coordinacionOfertasAcademicas = coordinacion
        element.coordinacionOfertasAcademicas = itemGasto.coordinacionOfertasAcademicas
        return
      }
      element.consecutivo=2
    })
  }
  receiveApoyo($event) {
    this.preupuesto.itemGasto.itemsGasto.forEach(element => {
      if (element.nombre === 'Gastos Generales') {
        let itemGasto: ItemGasto = new ItemGasto()
        itemGasto.nombre = 'Apoyo Logistico'
        let apoyos: ApoyosLogistico[] = []
        apoyos = $event
        itemGasto.apoyosLogisticos = apoyos
        element.apoyosLogisticos = itemGasto.apoyosLogisticos
        return
      }
      element.consecutivo=1
    })
  }
  receiveImpresion($event) {
    this.preupuesto.itemGasto.itemsGasto.forEach(element => {
      if (element.nombre === 'Gastos Generales') {
        let itemGasto: ItemGasto = new ItemGasto()
        itemGasto.nombre = 'Impresos y Publicaciones'
        let impresiones: ImpresoPublicacion[] = $event
        itemGasto.impresosPublicaciones = impresiones
        element.impresosPublicaciones = itemGasto.impresosPublicaciones
        return
      }
      element.consecutivo=3
    })
  }
  receiveAulas($event) {
    this.preupuesto.itemGasto.itemsGasto.forEach(element => {
      if (element.nombre === 'Otros Gastos') {
        let itemGasto: ItemGasto = new ItemGasto()
        itemGasto.nombre = 'Alquiler de Aulas'
        let aulas: AlquilerAula[] = $event
        itemGasto.alquilerAulas = aulas
        element.alquilerAulas = itemGasto.alquilerAulas
        return
      }
      element.consecutivo=1
    })
  }
  receiveOtros($event) {

    this.preupuesto.itemGasto.itemsGasto.forEach(element => {
      if (element.nombre === 'Otros Gastos') {
        let itemGasto: ItemGasto = new ItemGasto()
        itemGasto.nombre = 'Otros'
        let otros: OtroAnexo[] = $event
        itemGasto.otrosAnexos = otros
        element.otrosAnexos = itemGasto.otrosAnexos
        return
      }
      element.consecutivo=2
    })
  }
  enviarFrie() {
    let totalGastosAdminitstrativo=0
    let totalGasto=0
    this.preupuesto.itemGasto.itemsGasto.forEach(element => {
      element.valor = 0;
      if (element.nombre === 'Otros Gastos') {
        if(element.otrosAnexos!==undefined ){
          element.otrosAnexos.forEach(anexos => {
            element.valor = element.valor + anexos.valorTotal
            totalGasto =totalGasto+ element.valor
            totalGastosAdminitstrativo=totalGastosAdminitstrativo+ element.valor
          })
        }
        totalGastosAdminitstrativo+=element.valor
        if(element.alquilerAulas!== undefined ){
          element.alquilerAulas.forEach(aula => {
            element.valor = element.valor + aula.valorTotal
            totalGasto =totalGasto+ element.valor
            totalGastosAdminitstrativo=totalGastosAdminitstrativo+ element.valor
          })
        }
        element.consecutivo=3
      } else if (element.nombre === 'Servicios Profesionales') {
        if( element.serviciosEducativos!==undefined){
          element.serviciosEducativos.forEach(servicios => {
            element.valor = element.valor + servicios.valorTotal
            totalGasto =totalGasto+ element.valor
            totalGastosAdminitstrativo=totalGastosAdminitstrativo+ element.valor
          })
        }
        totalGastosAdminitstrativo=totalGastosAdminitstrativo+ element.valor
        if(element.coordinacionOfertasAcademicas!==undefined){
          element.coordinacionOfertasAcademicas.forEach(coordi => {
            element.valor = element.valor + coordi.valorTotal
            totalGasto =totalGasto+ element.valor
            totalGastosAdminitstrativo=totalGastosAdminitstrativo+ element.valor
          })
        }
      } else if (element.nombre === 'Gastos Generales') {
        if(element.apoyosLogisticos!==undefined ){
          element.apoyosLogisticos.forEach(apoyo => {
            element.valor = element.valor + apoyo.valorTotal
            totalGasto =totalGasto+ element.valor
            totalGastosAdminitstrativo=totalGastosAdminitstrativo+ element.valor
          })
        }
        if(element.materialesSuministro!==undefined ){
          element.materialesSuministro.forEach(mat => {
            element.valor = element.valor + mat.valorTotal
            totalGasto =totalGasto+ element.valor
            totalGastosAdminitstrativo=totalGastosAdminitstrativo+ element.valor
          })
        }
        totalGastosAdminitstrativo=totalGastosAdminitstrativo+ element.valor
        if(element.impresosPublicaciones!==undefined){
          element.impresosPublicaciones.forEach(impre => {
            element.valor = element.valor + impre.valorTotal
            totalGasto =totalGasto+ element.valor
            totalGastosAdminitstrativo=totalGastosAdminitstrativo+ element.valor
          })
        }
      }else if(element.nombre==='Gastos Administracion'){
        element.valor=this.preupuesto.itemIngreso.valor*0.1
        totalGasto= totalGasto+element.valor
      }
    })
    this.preupuesto.utilidad=this.preupuesto.itemIngreso.valor-totalGasto
    this.preupuesto.fondoInvestigacionUniversitario=this.preupuesto.utilidad*0.4
    this.preupuesto.utilidadNeta=this.preupuesto.utilidad-this.preupuesto.fondoInvestigacionUniversitario
    this.crearCursoService.guardar(this.curso, this.preupuesto).subscribe()
  }
  public buscar(id) {
    this.crearCursoService.buscar(id).subscribe(
      data => {
        let idTipoCurso=data.tipoCurso.id
        let imagen=''
        const { id, nombre, descripcion, idPresupuesto, 
                cantidadHoras, otroTipoCurso} = data;        
        let fI: any[]
        fI=data.fechaInicio.split('-')
        let año=Number.parseInt( fI[0])
        let mes=Number.parseInt( fI[1])
        let dia=Number.parseInt( fI[2])
        let fechaInicio =new NgbDate(año, mes, dia)
        

        let fF: any[]
        fF=data.fechaFin.split('-')
        let año1=Number.parseInt( fF[0])
        let mes1=Number.parseInt( fF[1])
        let dia1=Number.parseInt( fF[2])
        let fechaFin =new NgbDate(año1, mes1, dia1)
        

        let fLP: any[]
        fLP=data.fechaLimitePago.split('-')
        let año2=Number.parseInt( fLP[0])
        let mes2=Number.parseInt( fLP[1])
        let dia2=Number.parseInt( fLP[2])
        let fechaLimitePago =new NgbDate(año2, mes2, dia2)

        let fLR: any[]
        fLR=data.fechaLimiteRetiro.split('-')
        let año3=Number.parseInt( fLR[0])
        let mes3=Number.parseInt( fLR[1])
        let dia3=Number.parseInt( fLR[2])
        let fechaLimiteRetiro =new NgbDate(año3, mes3, dia3)
        this.cursoForm.patchValue({
          id, nombre,descripcion, cantidadHoras,  otroTipoCurso, idTipoCurso,fechaInicio, fechaFin,
          imagen, fechaLimitePago, fechaLimiteRetiro
        })
      },
      err => {
        console.log(err)
      }
    )

  }

}
