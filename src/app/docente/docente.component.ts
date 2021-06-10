import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-docente',
  templateUrl: './docente.component.html',
  styleUrls: ['./docente.component.css']
})
export class DocenteComponent implements OnInit {

  actividadesForm: FormGroup;
  @ViewChild('actividadFormView', { static: false }) viewActividadForm: NgForm;
  get a() { return this.actividadesForm.controls; }
  

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.actividadesForm = new FormGroup({
      id: new FormControl(),
      nombre: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      porcentaje: new FormControl('', Validators.required),
    });
  }

  openSm(verActividades, usu){
    this.modalService.open(verActividades, { size: 'xl' });
  }
  crearActividad(crearActividades){
    this.modalService.open(crearActividades);
  }
  editarActividad(crearActividades, act){
    this.modalService.open(crearActividades);

  }

  onSubmitActividadForm(){
    
  }

}
