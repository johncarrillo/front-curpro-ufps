import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import * as Chartist from 'chartist';
import { config } from 'rxjs';
import { ListaCursos } from '../../models/listaCurso';
import { ListarCursoService } from '../../services/listar-curso.service';
import { IngresoComponent } from '../crear-curso/ingreso/ingreso.component';


@Component({
  selector: 'app-listar-curso',
  templateUrl: './listar-curso.component.html',
  styleUrls: ['./listar-curso.component.css']
})
export class ListarCursoComponent implements OnInit {

  public cursoList: ListaCursos[]=[];

  


  constructor(private modalService: NgbModal,
    private listarcursoService:ListarCursoService,
    public router: Router) { 
    

  }

  ngOnInit(): void {
    this.listarCursos();
  }

  listarCursos(){
    this.listarcursoService.lista().subscribe(
      data => {
        this.cursoList = data
      },
      err => {
        console.log(err)
      }
    )
  }
  cur:any;
  masInfo(component, cur){
    this.cur=cur;
    this.modalService.open(component);

  }

  crearCurso() {
    this.router.navigate(['/crear-oferta']);
  }
  editarCurso(id){
    this.router.navigate(['/crear-oferta', id]);
  }
  registrarModulosCurso(id){
    this.router.navigate(['/modulo', id]);

  }
  

}
