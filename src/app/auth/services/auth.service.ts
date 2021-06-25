import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { User } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})

export class AuthService {

  public user: User;

  constructor(public afAuth: AngularFireAuth) { }

  async login(correo: string, clave: string) {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(
        correo,
        clave
      );
      return result;

    } catch (error) {
      console.log(error);
    }
  }

  async register(correo: string, clave: string) {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(
        correo,
        clave
      );
      return result;

    }catch (error){
      console.log(error);
     }
  }

  async logout(){
    await this.afAuth.auth.signOut();
  }

  getCurrentUser() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

}
