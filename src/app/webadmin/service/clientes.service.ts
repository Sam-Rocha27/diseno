import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestoreCollectionGroup } from '@angular/fire/firestore';
import { Clientes } from '../dashboard/modelos/clientes.model';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private firestore : AngularFirestore) { 
    this.clientesCollection = firestore.collection<Clientes>('clientes');
    this.clientes = this.clientesCollection.valueChanges();
  }

  private clientesCollection : AngularFirestoreCollection<Clientes>;
  private clientes : Observable<Clientes[]>;

  getClientes(){
    return this.clientes = this.clientesCollection.snapshotChanges()
    .pipe(map( changes =>{
      return changes.map( action =>{
        const data = action.payload.doc.data() as Clientes;
        data.IdCliente = action.payload.doc.id;
        return data;
      });
    }));
  }

  getCliente(IdCliente : string) {
    return this.firestore.collection('clientes').doc(IdCliente).snapshotChanges();
  }

  createCliente(cliente : Clientes) {
    return this.firestore.collection('clientes').add(cliente);
  }

  updateCliente(cliente : Clientes) {
    const IdCliente = cliente.IdCliente;
    this.firestore.doc('clientes/' + IdCliente).update(cliente);
  }

  deleteCliente( IdCliente : string) {
    this.firestore.doc('clientes/' + IdCliente).delete();
  }
}
