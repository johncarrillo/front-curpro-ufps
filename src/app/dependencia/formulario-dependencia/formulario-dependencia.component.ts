import { Component, ElementRef, Input, OnInit, Output } from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { ViewChild } from '@angular/core';
import { DependenciaService } from '../../services/dependencia.service';
import { Dependencia } from '../../models/dependencia';
import { DependenciaUpdate } from '../../models/dependenciaUpdate';
import { DependenciaSave } from '../../models/dependenciaSave';



@Component({
  selector: 'app-formulario-dependencia',
  templateUrl: './formulario-dependencia.component.html'
})
export class FormularioDependenciaComponent implements OnInit {

  private dependencia: DependenciaUpdate = undefined

  @ViewChild('content') content: ElementRef;

  @Output()
  cargarDependencia: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  set setDependencia (value: Dependencia) {
    if (value) {
      this.dependencia = {
        id: value.id,
        nombre: value.nombre,
        idUsuario: value.rolUsuarioDto ? value.rolUsuarioDto.idUsuario : undefined
      }
      this.dependenciaFormulario.reset({
        'nombre': this.dependencia.nombre
      })
      this.openSm(this.content)
    }
  }

  mensajeError: string;
  private roles: any[]
  constructor(private modalService: NgbModal, private dependenciaService: DependenciaService) { }

  dependenciaFormulario = new FormGroup({
    nombre: new FormControl('', Validators.required)
  })

  ngOnInit() {}

  openSm(content) {
    this.modalService.open(content, { size: 'sm' });
  }

  saveDependencia () {
    if (!this.validarFormulario()) {
      return
    }
    if (this.dependencia) {
      this.dependencia.nombre = this.dependenciaFormulario.value.nombre
      this.dependenciaService.actualizar(this.dependencia).subscribe(
        data => {
          this.modalService.dismissAll()
          this.dependenciaFormulario.reset({
            'nombre': ''
          })
          this.dependencia = undefined
          this.limpiarError()
          this.cargarDependencia.emit()
        },
        error => {
          console.error(error)
        })
    } else {
      let dependencia: DependenciaSave = {
        nombre: this.dependenciaFormulario.value.nombre
      }
      this.dependenciaService.guardar(dependencia).subscribe(
        data => {
          this.modalService.dismissAll()
          this.dependenciaFormulario.reset({
            'nombre': ''
          })
          this.limpiarError()
          this.cargarDependencia.emit()
        },
        error => {
          console.error(error)
        })
    }
  }

  validarFormulario () {
    let nombre = this.dependenciaFormulario.value.nombre
    if (!nombre || nombre === '') {
      this.mensajeError = 'El nombre es obligatorio'
      return false
    }
    return true
  }

  limpiarError () {
    this.mensajeError = undefined
  }
}
