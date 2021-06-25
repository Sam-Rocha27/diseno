import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UsuariosService } from '../../service/usuarios.service';
import { Usuarios } from '../modelos/usuarios.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  public mostrar = 'none';
  public opcion = 0;
  public seleccionado: Usuarios;
  public usForm: FormGroup;
  usuarios: Usuarios[];

  constructor(private formBuilder: FormBuilder, private usService: UsuariosService) { }


  ngOnInit() {
    this.usService.getUsuarios().subscribe(usuarios => {
      console.log('USUARIOS', usuarios);
      this.usuarios = usuarios;
    })
    this.buildForm();
  }

  private buildForm() {
    this.usForm = this.formBuilder.group({
      tipoUsuario: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      nombres: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      apellidos: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      status: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(2)]],
      direccion: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(70)]],
      telefono: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      noSeguro: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]]

    });
  }

  ngCrearUsuario(): void {
    this.usService.createUsuario(this.usForm.value);
    this.ngModalOcultar();
    this.usForm.reset();
  }

  ngModificarUsuario() {
    this.usService.updateUsuario(this.seleccionado);
    this.ngModalOcultar();
  }

  ngEliminarUsuario(usuarioID: string) {
    this.usService.deleteUsuario(this.seleccionado.usuarioID);
    this.ngModalOcultar();
  }

  ngModalMostrar(opc: number, Item): void {
    this.opcion = opc;
    this.mostrar = 'block';
    this.seleccionado = Item;
  }

  ngModalOcultar(): void {
    this.mostrar = 'none';
  }
}
