import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Citas } from '../modelos/citas.model';
import { CitasService } from '../../service/citas.service';


@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit {

  public mostrar ='none';
  public opcion = 0;
  public seleccionado: Citas;
  public ciForm: FormGroup;
  citas: Citas[];

  constructor( private formBuilder: FormBuilder, private ciService: CitasService ) { }


  ngOnInit() {
    this.ciService.getCitas().subscribe(citas => {
      console.log('Citas', citas);
      this.citas = citas;
    })
    this.buildForm();
  }
  
  private buildForm() {
    this.ciForm = this.formBuilder.group({
      fechaYhora: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      resumen: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      siguienteCita: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    });
  }

  ngCrearCita(): void {
    this.ciService.createCita(this.ciForm.value);
    this.ngModalOcultar();
    this.ciForm.reset();
  }

  ngModificarCita() {
    this.ciService.updateCita(this.seleccionado);
    this.ngModalOcultar();
  }

  ngEliminarCita(citaID: string) {
    this.ciService.deleteCita(this.seleccionado.citasID);
    this.ngModalOcultar();
  }


  ngModalMostrar(opc: number, Item): void{
    this.opcion = opc;
    this.mostrar = 'block';
    this.seleccionado= Item;
  }
  ngModalOcultar(): void{
    this.mostrar = 'none';
  }

}
