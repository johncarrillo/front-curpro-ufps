import { Component, ElementRef, Input, OnInit, Output } from '@angular/core';
import * as Chartist from 'chartist';
import { Usuario } from '../../models/usuario';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ROLES } from '../../constantes/constantes';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { EventEmitter } from '@angular/core';
import { ViewChild } from '@angular/core';



@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuarios.component.html'
})
export class AgregarUsuarioComponent implements OnInit {

  private usuario: Usuario = undefined

  @ViewChild('content') content: ElementRef;

  @Output()
  cargarUsuarios: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  set setUsuario (value: Usuario) {
    if (value) {
      this.usuario = value
      this.crearUsuarioFormulario.reset({
        'nombre': this.usuario.nombre,
        'apellido': this.usuario.apellido,
        'correo': this.usuario.correo
      })
      this.openSm(this.content)
    }
  }

  mensajeError: string;
  private roles: any[]
  constructor(private modalService: NgbModal, private usuarioService: UsuarioService) { }

  crearUsuarioFormulario = new FormGroup({
    apellido: new FormControl('', Validators.required),
    correo: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required)
  })

  ngOnInit() {}

  openSm(content) {
    this.modalService.open(content, { size: 'sm' });
  }

  saveUsuario () {
    if (!this.validarFormulario()) {
      return
    }
    if (this.usuario) {
      this.usuario.nombre = this.crearUsuarioFormulario.value.nombre
      this.usuario.apellido = this.crearUsuarioFormulario.value.apellido
      this.usuario.correo = this.crearUsuarioFormulario.value.correo
      this.usuarioService.actualizar(this.usuario).subscribe(
        data => {
          this.modalService.dismissAll()
          this.crearUsuarioFormulario.reset({
            'nombre': '',
            'apellido': '',
            'correo': ''
          })
          this.usuario = undefined
          this.limpiarError()
          this.cargarUsuarios.emit()
        },
        error => {
          console.error(error)
        })
    } else {
      let usuario: Usuario = {
        id: undefined,
        nombre: this.crearUsuarioFormulario.value.nombre,
        apellido: this.crearUsuarioFormulario.value.apellido,
        correo: this.crearUsuarioFormulario.value.correo,
        roles: undefined
      }
      this.usuarioService.guardar(usuario).subscribe(
        data => {
          this.modalService.dismissAll()
          this.crearUsuarioFormulario.reset({
            'nombre': '',
            'apellido': '',
            'correo': ''
          })
          this.limpiarError()
          this.cargarUsuarios.emit()
        },
        error => {
          console.error(error)
        })
    }
  }

  validarFormulario () {
    console.log('entro a validar')
    let nombre = this.crearUsuarioFormulario.value.nombre
    let apellido = this.crearUsuarioFormulario.value.apellido
    let correo = this.crearUsuarioFormulario.value.correo
    if (!nombre || !apellido || !correo || nombre === '' || apellido === '' || correo === '') {
      this.mensajeError = 'Todos los campos son requeridos para la creación del usuario'
      return false
    }
    if (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(correo)){
      this.mensajeError = 'El correo no es valido'
      return false
    }
    return true
  }

  limpiarError () {
    this.mensajeError = undefined
  }
}
