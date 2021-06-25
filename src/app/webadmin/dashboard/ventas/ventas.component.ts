import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Ventas } from '../modelos/ventas.model';
import { VentasService} from '../../service/ventas.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  public mostrar = 'none';
  public opcion = 0;
  public seleccionado : Ventas;
  public veForm : FormGroup;
  ventas : Ventas[];

  constructor( private formBuilder: FormBuilder, private veService: VentasService ) { }

  ngOnInit(): void {
    this.veService.getVentas().subscribe(ventas =>{
      console.log('Ventas', ventas);
      this.ventas = ventas;      
    })
    this.buildForm();
  }

  private buildForm() {
    this.veForm = this.formBuilder.group({
      Cliente: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      Articulo: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    });
  }

  ngCrearVenta(): void {
    this.veService.createVenta(this.veForm.value);
    this.ngModalOcultar();
    this.veForm.reset();
  }

  ngModificarVenta() {
    this.veService.updateVenta(this.seleccionado);
    this.ngModalOcultar();
  }

  ngEliminarVenta(IdVenta : string) {
    this.veService.deleteVenta(this.seleccionado.IdVenta);
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
