import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-cronograma',
  templateUrl: './cronograma.component.html',
  styleUrls: ['./cronograma.component.css']
})
export class CronogramaComponent implements OnInit {

  cronogramaForm:FormGroup;
  @ViewChild('cronogramaFormView', { static: false }) viewCronogramaFormForm: NgForm;
  get c() { return this.cronogramaForm.controls; }
  

  constructor() { }

  ngOnInit(): void {
    this.cronogramaForm = new FormGroup({
      fechaI: new FormControl('', Validators.required),
      fechaF: new FormControl('', Validators.required),
      horas: new FormControl('', Validators.required),
      fechaLInscripcion: new FormControl(''),
      fechaLPInscripcion: new FormControl('', Validators.required),
      fechaLPMatricula: new FormControl('', Validators.required),
      fechaLEntregaNotas: new FormControl('', Validators.required),
    });
  }
  activeSubmitCronogramaForm(){
    console.log(this.cronogramaForm)
  }

}
