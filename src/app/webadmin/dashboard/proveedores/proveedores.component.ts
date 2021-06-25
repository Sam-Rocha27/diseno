import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Proveedores } from '../modelos/proveedores.model';
import { ProveedoresService } from '../../service/proveedores.service';


@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {

  public mostrar = 'none';
  public opcion = 0;
  public seleccionado : Proveedores;
  public poForm : FormGroup;
  proveedores: Proveedores[];

  constructor( private formBuilder: FormBuilder, private poService: ProveedoresService  ) { }

  ngOnInit(): void {
    this.poService.getProveedores().subscribe(proveedores =>{
      console.log('Proveedores', proveedores);
      this.proveedores = proveedores;      
    })
    this.buildForm();
  }

  private buildForm() {
    this.poForm = this.formBuilder.group({
      Nombre: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      Fabrica: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      Productos: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      NumContacto: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    });
  }

  ngCrearProveedor(): void {
    this.poService.createProveedor(this.poForm.value);
    this.ngModalOcultar();
    this.poForm.reset();
  }

  ngModificarProveedor() {
    this.poService.updateProveedor(this.seleccionado);
    this.ngModalOcultar();
  }

  ngEliminarProveedor(IdProveedor : string) {
    this.poService.deleteProveedor(this.seleccionado.IdProveedor);
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
