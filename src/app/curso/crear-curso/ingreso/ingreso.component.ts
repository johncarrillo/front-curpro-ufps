
import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { element } from 'protractor';
import { InscripcionMatricula } from '../../../models/inscripcion-matricula';

import { PresupuestoService } from '../../../services/presupuesto.service';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.css']
})
export class IngresoComponent implements OnInit {

  @Output() ingreso = new EventEmitter<InscripcionMatricula[]>();

  inscripcionMatriculaList: InscripcionMatricula[] = [];
  inscripcionMatricula: InscripcionMatricula;
  editando: boolean = false;
  idtemp;








  constructor(config: NgbModalConfig, private modalService: NgbModal,
    public presupuestoService: PresupuestoService, private _route: ActivatedRoute) {
    config.backdrop = 'static';
    config.keyboard = false;
    this.idtemp=0
  }
  modal: boolean = false;
  itemIngresoForm: FormGroup;
  @ViewChild('itemIngresoFormView', { static: false }) viewItemIngresoForm: NgForm;


  ngOnInit(): void {
    this._route.paramMap.subscribe(params => {
      if (params.get('id') !== null) {
        this.buscar(params.get('id'))
      }
    })
    this.itemIngresoForm = new FormGroup({
      id: new FormControl(),
      idtem:new FormControl(),
      tipoParticipante: new FormControl('', Validators.required),
      cantidad: new FormControl('', Validators.required),
      valorUnitario: new FormControl('', Validators.required),
      valorTotal: new FormControl('', Validators.required)
    });
  }

  public buscar(id) {
    this.presupuestoService.buscar(id).subscribe(
      data => {
        data.itemIngreso.inscripcionMatricula.forEach(it => {
          this.inscripcionMatriculaList.push(it)
        })
        console.log('-------inscripcionMatriculaList---------')
        console.log(this.inscripcionMatriculaList)
      },
      err => {
        console.log(err)
      }
    )

  }

  get f() { return this.itemIngresoForm.controls; }

  activeSubmitItemIngresoForm(cerrar, content) {
    if (!this.editando) {
      console.log('---------false--------------')
      let total = this.itemIngresoForm.get('valorUnitario').value * this.itemIngresoForm.get('cantidad').value
      this.itemIngresoForm.get('valorTotal').setValue(total)
      this.itemIngresoForm.get('idtem').setValue(this.idtemp=this.idtemp+1)
      console.log('-----------cuando crea-----------')
      console.log(this.itemIngresoForm.get('idtem').value)
      this.inscripcionMatriculaList.push(this.itemIngresoForm.value)
      this.ingreso.emit(this.inscripcionMatriculaList);
    } else {
      console.log('-----------------')
      console.log(this.itemIngresoForm.value)
      if(this.itemIngresoForm.get('idtem').value!==0){
        console.log('if')
        this.inscripcionMatriculaList.forEach(element => {
          if (element.id === this.inscripcionMatricula.id) {
            element.valorTotal = this.itemIngresoForm.get('valorUnitario').value * this.itemIngresoForm.get('cantidad').value
            element.cantidad = this.itemIngresoForm.get('cantidad').value
            element.id=this.itemIngresoForm.get('id').value
            element.valorUnitario=this.itemIngresoForm.get('valorUnitario').value
            element.tipoParticipante=this.itemIngresoForm.get('tipoParticipante').value
            return
          }
        })
      }else{
        this.inscripcionMatriculaList.forEach(element => {
          if (element.idTemp === this.inscripcionMatricula.idTemp) {
            element.valorTotal = this.itemIngresoForm.get('valorUnitario').value * this.itemIngresoForm.get('cantidad').value
            element.cantidad = this.itemIngresoForm.get('cantidad').value
            element.id=this.itemIngresoForm.get('id').value
            element.valorUnitario=this.itemIngresoForm.get('valorUnitario').value
            element.tipoParticipante=this.itemIngresoForm.get('tipoParticipante').value
            return
          }
        })

      }
      
    }


  }

  open(content) {
    this.modalService.open(content, { size: 'xl' });
  }
  registrar(content1) {
    this.editando = false;
    this.itemIngresoForm.reset();
    this.modalService.open(content1);
  }
  actualizar(content1, lma) {
    this.inscripcionMatricula = lma;
    console.log('lma')
    console.log(lma)
    this.editando = true;
    if(lma.idtem===undefined){
      lma.idtem=0
    }
    const { id, tipoParticipante, cantidad, valorUnitario, valorTotal, idtem} = lma;
    this.itemIngresoForm.setValue({
      id, tipoParticipante, cantidad, valorUnitario, valorTotal, idtem
    })

    this.modalService.open(content1);

  }

}
