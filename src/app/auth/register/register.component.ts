import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService],
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    correo: new FormControl(''),
    clave: new FormControl(''),
  });

  constructor( private authSvc:AuthService, private router:Router) { }

  ngOnInit() {
  }

  async onRegister(){
    const {correo, clave} = this.registerForm.value;
    try{
      const user = await this.authSvc.register(correo, clave);
      if(user){
        //redirecto 
        this.router.navigate(['/inicio']);
      }
    }
    catch(error){console.log(error)}

  }

}
