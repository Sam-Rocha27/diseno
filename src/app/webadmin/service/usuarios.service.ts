import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Usuarios } from '../dashboard/modelos/usuarios.model';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private firestore: AngularFirestore) { 
    this.usuariosCollection = firestore.collection<Usuarios>('usuarios');
    this.usuarios = this.usuariosCollection.valueChanges();
  }
  private usuariosCollection : AngularFirestoreCollection<Usuarios>;
  private usuarios : Observable<Usuarios[]>;


  getUsuarios() {
    return this.usuarios =  this.usuariosCollection.snapshotChanges()
    .pipe(map( changes =>{
      return changes.map( action =>{
        const data = action.payload.doc.data() as Usuarios;
        data.usuarioID = action.payload.doc.id;
        return data;
      });
    }));
  }

  getUsuario(usuarioID: string) {
    return this.firestore.collection('usuarios').doc(usuarioID).snapshotChanges();
  }

  createUsuario(usuario: Usuarios) {
    return this.firestore.collection('usuarios').add(usuario);
  }

  updateUsuario(usuario: Usuarios) {
    const usuarioID = usuario.usuarioID;
    this.firestore.doc('usuarios/' + usuarioID).update(usuario);
  }

  deleteUsuario(usuarioID: string) {
    this.firestore.doc('usuarios/' + usuarioID).delete();
  }

}
