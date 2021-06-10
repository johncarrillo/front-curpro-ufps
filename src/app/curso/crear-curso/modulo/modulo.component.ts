import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Modulo } from '../../../models/modulo';

@Component({
  selector: 'app-modulo',
  templateUrl: './modulo.component.html',
  styleUrls: ['./modulo.component.css']
})
export class ModuloComponent implements OnInit {
  moduloForm:FormGroup;
  @ViewChild('moduloFormView', { static: false }) viewModuloForm: NgForm;
  get m() { return this.moduloForm.controls; }
  modulos:Modulo[]= [{nombreModulo:'prueba', docenteModulo:'oscar'}, {nombreModulo:'contenido', docenteModulo:'pilar'}];
  @ViewChild('name', { static: false }) inputElement: ElementRef;
  modulo1:Modulo= new Modulo();
  editando:Boolean=false;

  constructor(private  modalService: NgbModal) {
    
   }

  ngOnInit(): void {
    this.moduloForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      profesor: new FormControl('', Validators.required)
    });
  }
  registrar(content){
    this.modalService.open(content);
    
  }
  activeSubmitModuloForm(content){

  }
  editar(content, mod:Modulo){
    this.modulo1=mod;
    this.editando=true;
    this.modalService.open(content);

  }
  

}
