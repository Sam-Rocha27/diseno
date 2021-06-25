import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Clientes } from '../modelos/clientes.model';
import { ClientesService } from '../../service/clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  public mostrar = 'none';
  public opcion = 0;
  public seleccionado : Clientes;
  public cliForm : FormGroup;
  clientes : Clientes[];

  constructor( private formBuilder: FormBuilder, private cliSercvie: ClientesService) { }

  ngOnInit(): void {
    this.cliSercvie.getClientes().subscribe(clientes =>{
      console.log('Clientes', clientes);
      this.clientes = clientes;      
    })
    this.buildForm();
  }

  private buildForm() {
    this.cliForm = this.formBuilder.group({
      Nombres: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      Apellidos: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      Telefono: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    });
  }

  ngCrearCliente(): void {
    this.cliSercvie.createCliente(this.cliForm.value);
    this.ngModalOcultar();
    this.cliForm.reset();
  }

  ngModificarCliente() {
    this.cliSercvie.updateCliente(this.seleccionado);
    this.ngModalOcultar();
  }

  ngEliminarCliente(IdCliente : string) {
    this.cliSercvie.deleteCliente(this.seleccionado.IdCliente);
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
