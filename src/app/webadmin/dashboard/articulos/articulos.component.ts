import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Articulos } from '../modelos/articulos.model';
import { ArticulosService } from '../../service/articulos.service';


@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})

export class ArticulosComponent implements OnInit {

  public mostrar = 'none';
  public opcion = 0;
  public seleccionado : Articulos;
  public arForm : FormGroup;
  articulos: Articulos[];


  constructor( private formBuilder: FormBuilder, private arService: ArticulosService ) { }

  ngOnInit(): void {
    this.arService.getArticulos().subscribe(articulos =>{
      console.log('Articulos', articulos);
      this.articulos = articulos;
    })
    this.buildForm();
  }

  private buildForm() {
    this.arForm = this.formBuilder.group({
      Tipo: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      Nombre: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      Precio: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    });
  }

  ngCrearArticulo(): void {
    this.arService.createArticulo(this.arForm.value);
    this.ngModalOcultar();
    this.arForm.reset();
  } 

  ngModificarArticulo() {
    this.arService.updateArticulo(this.seleccionado);
    this.ngModalOcultar();
  } 

  ngEliminarArticulo(IdArticulo: string) {
    this.arService.deleteArticulo(this.seleccionado.IdArticulo);
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
