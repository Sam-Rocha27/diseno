import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[AuthService],
})

export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    correo: new FormControl(''),
    clave: new FormControl(''),
  });


  constructor(private authSvc: AuthService, private router: Router ) { }

  ngOnInit() {

  }

  async onLogin(){
    const {correo, clave} = this.loginForm.value;
    try{
      const user = await this.authSvc.login(correo, clave);
      if(user){
         //Redirecto Dashboard
         this.router.navigate(['/dashboard']);
      }
    }
    catch(error){console.log(error)}

  }


  /*private buildFrom(){
    this.loginForm = this.formBuilder.group({
      Correo: ['', [ Validators.email, Validators.minLength(4), Validators.maxLength(50) ]],
      Clave:['', [ Validators.required, Validators.minLength(4), Validators.maxLength(15) ]]
    });
  }*/

  /*
  public ngOnAcceder(): void{
    const { Correo, Clave } = this.formLogin.value;

    this.authService.onLogin(Correo, Clave)
    .then((result) => {
      this.router.navigate(['/dashboard']);
      this.authService.onSetUsuario(result.user);
    }).cath((error) =>{
      this.ngModalMostrar();
    });
  }

  ngModalMostrar(): void{
    this.mostrar = 'block';
  }
  ngModalOcultar(): void{
    this.mostrar = 'none';
  }
  */
}
