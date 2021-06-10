import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbAccordionConfig, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MaterialSuministro } from '../../../models/material-suministro';
import { ApoyosLogistico } from '../../../models/apoyos-logistico';

import { PresupuestoService } from '../../../services/presupuesto.service';
import { CoordinacionOfertasAcedemica } from '../../../models/coordinacion-ofertas-acedemica';
import { ServiciosEducativos } from '../../../models/servicios-educativos';
import { ImpresoPublicacion } from '../../../models/impreso-publicacion';
import { AlquilerAula } from '../../../models/alquiler-aula';
import { OtroAnexo } from '../../../models/otro-anexo';
import { ActivatedRoute } from '@angular/router';
import { ItemGasto } from '../../../models/item-gasto';
import { element } from 'protractor';
declare var $;

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css']
})
export class GastosComponent implements OnInit {

  @ViewChild('dataTable') table: ElementRef;
  dataTable: any;

  honorarioForm: FormGroup;
  honorarioList: ServiciosEducativos[] = [];
  honorario: ServiciosEducativos;
  honorarioEdit: boolean = false;
  @Output() honor = new EventEmitter<ServiciosEducativos[]>();
  @ViewChild('honorarioFormView', { static: false }) viewHonorarioForm: NgForm;
  get h() { return this.honorarioForm.controls; }

  coordinacionForm: FormGroup;
  coordinacionList: CoordinacionOfertasAcedemica[] = [];
  coordinacion: CoordinacionOfertasAcedemica;
  coordinacionEdit: boolean = false;
  @Output() coordi = new EventEmitter<CoordinacionOfertasAcedemica[]>();
  @ViewChild('coordinacionFormView', { static: false }) viewcoordinacionForm: NgForm;
  get c() { return this.coordinacionForm.controls; }

  apoyosLogisticosList: ApoyosLogistico[] = [];
  apoyoLogistico: ApoyosLogistico;
  apoyoEdit: boolean = false;
  apoyoLogisticoForm: FormGroup;
  @Output() apoyo = new EventEmitter<ApoyosLogistico[]>();
  @ViewChild('apoyoLogisticoFormView', { static: false }) viewapoyoLogisticoForm: NgForm;
  get al() { return this.coordinacionForm.controls; }

  materiaSumList: MaterialSuministro[] = []
  materiaSum: MaterialSuministro
  materiaSumEdit: boolean = false;
  materialForm: FormGroup;
  @Output() materialSum = new EventEmitter<MaterialSuministro[]>();
  @ViewChild('materialFormView', { static: false }) viewMaterialForm: NgForm;
  get ma() { return this.coordinacionForm.controls; }

  impresionForm: FormGroup;
  impresionList: ImpresoPublicacion[] = [];
  impresion: ImpresoPublicacion;
  impresionEdit: boolean = false;
  @Output() impre = new EventEmitter<ImpresoPublicacion[]>()
  @ViewChild('impresionFormView', { static: false }) viewImpresionForm: NgForm;
  get i() { return this.coordinacionForm.controls; }

  aulaForm: FormGroup;
  aulaList: AlquilerAula[] = []
  aula: AlquilerAula
  aulaEdit: boolean = false
  @Output() aulas = new EventEmitter<AlquilerAula[]>()
  @ViewChild('aulaFormView', { static: false }) viewAulaForm: NgForm;
  get au() { return this.coordinacionForm.controls; }

  otrosForm: FormGroup;
  otrosList: OtroAnexo[] = []
  otro: OtroAnexo
  otroEdit: boolean = false
  @Output() otros = new EventEmitter<OtroAnexo[]>()
  @ViewChild('otrosFormView', { static: false }) viewOtrosForm: NgForm;
  get ot() { return this.otrosForm.controls; }

  itemGastoList: ItemGasto[] = []




  constructor(config: NgbAccordionConfig, private modalService: NgbModal,
    public presupuestoService: PresupuestoService, private _route: ActivatedRoute) {
    config.closeOthers = true;
    config.type = 'primary';
  }

  ngOnInit(): void {
    this._route.paramMap.subscribe(params => {
      if (params.get('id') !== null) {
        this.buscar(params.get('id'))
      }
    })
    this.honorarioForm = new FormGroup({
      id: new FormControl(),
      nombreDocente: new FormControl('', Validators.required),
      escolaridad: new FormControl('', Validators.required),
      escalafon: new FormControl('', Validators.required),
      puntaje: new FormControl('', Validators.required),
      valorPunto: new FormControl('', Validators.required),
      valorHora: new FormControl('', Validators.required),
      cantidadHora: new FormControl('', Validators.required),
      valorTotal: new FormControl()
    });
    this.coordinacionForm = new FormGroup({
      id: new FormControl(),
      nombre: new FormControl('', Validators.required),
      perfil: new FormControl('', Validators.required),
      idoneidadCompetencia: new FormControl('', Validators.required),
      valorTotal: new FormControl('', Validators.required)
    });
    this.apoyoLogisticoForm = new FormGroup({
      id: new FormControl(),
      numero: new FormControl('', Validators.required),
      actividad: new FormControl('', Validators.required),
      valorTotal: new FormControl('', Validators.required)
    });
    this.materialForm = new FormGroup({
      id: new FormControl(),
      tipo: new FormControl('', Validators.required),
      numero: new FormControl('', Validators.required),
      bien: new FormControl('', Validators.required),
      cantidad: new FormControl('', Validators.required),
      valorUnitario: new FormControl('', Validators.required),
      valorTotal: new FormControl('', Validators.required)
    });
    this.impresionForm = new FormGroup({
      id: new FormControl(),
      numero: new FormControl('', Validators.required),
      publicacion: new FormControl('', Validators.required),
      cantidad: new FormControl('', Validators.required),
      valorUnitario: new FormControl('', Validators.required),
      valorTotal: new FormControl(),
    });
    this.aulaForm = new FormGroup({
      id: new FormControl(),
      numero: new FormControl('', Validators.required),
      dependenciaPrestaServicio: new FormControl('', Validators.required),
      cantidad: new FormControl('', Validators.required),
      valorUnitario: new FormControl('', Validators.required),
      valorTotal: new FormControl(),
    });
    this.otrosForm = new FormGroup({
      id: new FormControl(),
      numero: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      valorTotal: new FormControl('', Validators.required)
    });
  }



  open(content, nombre) {
    this.itemGastoList.forEach(element => {
      if (nombre === element.nombre && element.nombre === 'Servicios Profesionales') {
        console.log('------------elemeent ----------')
        console.log(element)
        
          element.serviciosEducativos.forEach(el => {
            this.honorarioList.push(el)
            console.log('------------educativo----------')
          console.log(this.honorarioList)
          })
          element.coordinacionOfertasAcademicas.forEach(el => {
            this.coordinacionList.push(el)
          })
        
        return
      }
      if (nombre === element.nombre && element.nombre === 'Gastos Generales') {
        console.log('------------segundo if----------')
        
          element.apoyosLogisticos.forEach(el => {
            this.apoyosLogisticosList.push(el)
          })
          element.materialesSuministro.forEach(el => {
            this.materiaSumList.push(el)
          })
          element.impresosPublicaciones.forEach(el => {
            this.impresionList.push(el)
          })
        
        return
      }
      if(nombre === element.nombre && element.nombre === 'Otros Gastos'){
        console.log('------------tercer if----------')
        
          element.alquilerAulas.forEach(el => {
            this.aulaList.push(el)
          })
          element.otrosAnexos.forEach(el => {
            this.otrosList.push(el)
          })
        return
      }
    })

    this.modalService.open(content, { size: 'xl' });


  }
  registrar(content) {
    this.honorarioForm.reset()
    this.honorarioEdit = true;
    this.modalService.open(content, { size: 'lg' });

  }
  actualizarHonor(registrarHonorario, h) {
    this.honorarioEdit = true;
    this.honorario = h
    const { id, nombreDocente, escolaridad, escalafon, puntaje,
      valorPunto, valorHora, cantidadHora, valorTotal } = this.honorario;
    this.honorarioForm.setValue({
      id, nombreDocente, escolaridad, escalafon, puntaje, valorPunto, valorHora, cantidadHora, valorTotal
    })
    this.modalService.open(registrarHonorario, { size: 'lg' });

  }
  onSubmitHonorarioForm(content) {
    let valortotal = this.honorarioForm.get('valorHora').value * this.honorarioForm.get('cantidadHora').value
    this.honorarioForm.get('valorTotal').setValue(valortotal)
    this.honorarioList.push(this.honorarioForm.value)
    this.honor.emit(this.honorarioList);


  }
  registrarC(content) {
    this.coordinacionEdit = false;
    this.coordinacionForm.reset()
    this.modalService.open(content);
  }
  activeSubmitCoordinacionForm(cerrar) {
    this.coordinacionList.push(this.coordinacionForm.value)
    this.coordi.emit(this.coordinacionList);

  }
  actualizarCoordinacion(registrarCoordinacion, c) {
    this.coordinacionEdit = true;
    this.coordinacion = c
    const { id, nombre, perfil, idoniedadCompetencia, valorTotal } = this.coordinacion;
    this.coordinacionForm.setValue({
      id, nombre, perfil, idoniedadCompetencia, valorTotal
    })
    this.modalService.open(registrarCoordinacion);
  }
  registrarApoyo(content) {
    //apoyoLogistico
    this.apoyoEdit = false;
    this.apoyoLogisticoForm.reset();
    this.modalService.open(content);

  }
  activeSubmitApoyoLogisticoForm(cerrar) {
    this.apoyosLogisticosList.push(this.apoyoLogisticoForm.value)
    this.apoyo.emit(this.apoyosLogisticosList);
  }
  actualizarApoyo(apoyoLogistico, a) {
    this.apoyoEdit = true;
    this.apoyoLogistico = a
    const { id, numero, actividad, valorTotal } = apoyoLogistico;
    this.apoyoLogisticoForm.setValue({
      id, numero, actividad, valorTotal
    })
    this.modalService.open(apoyoLogistico);
  }

  registrarMateria(content) {
    //materialesSuministros
    this.materialForm.reset()

    this.modalService.open(content);
  }
  activeSubmitMaterialForm() {

    let valor_total = this.materialForm.get('valorUnitario').value * this.materialForm.get('cantidad').value
    this.materialForm.get('valorTotal').setValue(valor_total)
    this.materiaSumList.push(this.materialForm.value)
    this.materialSum.emit(this.materiaSumList)
  }

  editar(materialesSuministros, m) {
    this.materiaSumEdit = true;
    this.materiaSum = m;
    const { id, numero, bienServicio, cantidad, valorUnitario, valorTotal } = this.materiaSum;
    this.materialForm.setValue({
      id, numero, bienServicio, cantidad, valorUnitario, valorTotal
    })
    this.modalService.open(materialesSuministros);
  }




  registrarImpresion(content) {
    //impresion
    this.impresionForm.reset()
    this.modalService.open(content);

  }
  activeSubmitImpresionForm() {
    let valor_total = this.impresionForm.get('valorUnitario').value * this.impresionForm.get('cantidad').value
    this.impresionForm.get('valorTotal').setValue(valor_total)
    this.impresionList.push(this.impresionForm.value)
    this.impre.emit(this.impresionList)
  }
  actualizarImpresion(impresion, i) {
    this.impresionEdit = true;
    this.impresion = i;
    const { id, numero, publicacion, cantidad, valorUnitario, valorTotal } = this.impresion;
    this.impresionForm.setValue({
      id, numero, publicacion, cantidad, valorUnitario, valorTotal
    })
    this.modalService.open(impresion);

  }
  registrarAlquilerAulas(content) {
    //alquilerAulas
    this.aulaForm.reset()
    this.modalService.open(content);
  }
  editarAlquilerAulas(alquilerAulas, au) {
    this.aulaEdit = true;
    this.aula = au;
    const { id, numero, dependenciaPrestaServicio, cantidad, valorUnitario, valorTotal } = this.aula;
    this.aulaForm.setValue({
      id, numero, dependenciaPrestaServicio, cantidad, valorUnitario, valorTotal
    })
    this.modalService.open(alquilerAulas);

  }

  activeSubmitAulaForm(cerrar) {
    let valor_total = this.aulaForm.get('valorUnitario').value * this.aulaForm.get('cantidad').value
    this.aulaForm.get('valorTotal').setValue(valor_total)
    this.aulaList.push(this.aulaForm.value)
    this.aulas.emit(this.aulaList)

  }


  registrarOtros(content) {
    //otros
    this.otroEdit = false;
    this.otrosForm.reset();
    this.modalService.open(content);
  }




  actualizarOtros(otros, o) {
    this.otroEdit = true;
    this.otro = o;
    const { id, numero, descripcion, valorTotal } = this.otro;
    this.otrosForm.setValue({
      id, numero, descripcion, valorTotal
    })
    this.modalService.open(otros);
  }

  activeSubmitotrosForm(content) {
    this.otrosList.push(this.otrosForm.value)
    this.otros.emit(this.otrosList)
  }

  public buscar(id) {
    this.presupuestoService.buscar(id).subscribe(
      data => {
        data.itemGasto.itemsGasto.forEach(element => {
          this.itemGastoList.push(element)
        })
        console.log('---------------------------------')
        console.log(this.itemGastoList)
      },
      err => {
        console.log(err)
      }
    )

  }
}
