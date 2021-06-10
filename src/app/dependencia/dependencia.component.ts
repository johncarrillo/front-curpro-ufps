import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { Dependencia } from '../models/dependencia';
import { DependenciaUpdate } from '../models/dependenciaUpdate';
import { Usuario } from '../models/usuario';
import { DependenciaService } from '../services/dependencia.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-dependencia',
  templateUrl: './dependencia.component.html',
  styleUrls: ['./dependencia.component.css']
})
export class DependenciaComponent implements OnInit {


  public listaDirectores: Usuario[] = []
  public dependencias: Dependencia[] = []
  private dependenciaSelect: Dependencia = undefined
  private dependenciaSelectEdit: Dependencia = undefined
  constructor(private dependenciaService: DependenciaService,
              private modalService: NgbModal,
              private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.listarDependencias()
  }

  listarDependencias () {
    this.dependenciaService.lista().subscribe(
      data => {
        this.dependencias = data
      },
      err => {
        console.log(err)
      }
    )
  }

  openSm(content, dependencia: Dependencia) {
    this.dependenciaSelect = dependencia
    this.modalService.open(content, { size: 'lg' });
    this.listarDirectores()
  }

  openSmEdit(dependencia: Dependencia) {
    this.dependenciaSelectEdit = dependencia
  }

  listarDirectores () {
    this.usuarioService.listarDirectores().subscribe(
      data => {
        this.listaDirectores = data
      },
      err => {
        console.log(err)
      }
    )
  }

  guardarDependencia() {}

  actualizarDependencia(director: Usuario) {
    const dependenciaUpdate: DependenciaUpdate = {
      id: this.dependenciaSelect.id,
      nombre: this.dependenciaSelect.nombre,
      idUsuario:  director.id
    }
    this.dependenciaService.actualizar(dependenciaUpdate).subscribe(
      data => {
        this.modalService.dismissAll()
        this.listarDependencias()
      },
      err => {
        console.log(err)
      }
    )
  }

  consultarDependencia() {}

  eliminarDependencia() {}
}
