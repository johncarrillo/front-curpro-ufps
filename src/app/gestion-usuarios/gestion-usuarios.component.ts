import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';
import { ROLES } from '../constantes/constantes';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Rol } from '../models/rol';
import { RolAsignarUsuario } from '../models/RolAsignarUsuario';
import { AgregarUsuarioComponent } from './agregar-usuario/agregar-usuarios.component'

@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.css']
})
export class GestionUsuariosComponent implements OnInit {


  public usuarios: Usuario[] = []
  private roles: any[]
  private usuarioSelect: Usuario = undefined
  private usuarioSelectEdit: Usuario = undefined
  constructor(private usuarioService: UsuarioService, private modalService: NgbModal) { }

  ngOnInit() {
    this.roles = ROLES.map(rol => {
      return {
        ...rol, 
        select: false 
      }
    })
    this.listarUsuarios()
  }

  listarUsuarios () {
    this.usuarioService.lista().subscribe(
      data => {
        this.usuarios = data
      },
      err => {
        console.log(err)
      }
    )
  }

  asignarRolUsuarios (rolAsignarUsuario: RolAsignarUsuario) {
    this.usuarioService.asignarRol(rolAsignarUsuario).subscribe(
      data => {
        this.listarUsuarios()
      },
      err => {
        console.log(err)
      }
    )
  }

  rolesActiveToString (roles: any[]) {
    let listaNombre: string[] = []
    if (roles){
      listaNombre = roles.map(rol => {
        return rol.nombreRol
      })
    }
    return listaNombre
  }

  openSm(content, usuario: Usuario) {
    this.roles = ROLES.map(rol => {
      return {
        ...rol, 
        select: usuario.roles.filter(usu => usu.idRol === rol.id).length == 1
      }
    })
    this.modalService.open(content, { size: 'sm' });
    this.usuarioSelect = usuario
  }

  openSmEditar(usuario: Usuario) {
    this.usuarioSelectEdit = usuario
  }

  clickRol (rol: any) {
    rol.select = !rol.select
    let rolAsignarUsuario: RolAsignarUsuario = {
      idRol: rol.id,
      idUsuario: this.usuarioSelect.id,
      asignar: rol.select
    }
    this.asignarRolUsuarios(rolAsignarUsuario)
  }

}
