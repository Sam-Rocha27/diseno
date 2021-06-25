import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestoreCollectionGroup } from '@angular/fire/firestore';
import { Proveedores } from '../dashboard/modelos/proveedores.model';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  constructor( private firestore:AngularFirestore ) { 
    this.proveedoresCollection = firestore.collection<Proveedores>('proveedores');
    this.proveedores = this.proveedoresCollection.valueChanges();
  }
  private proveedoresCollection : AngularFirestoreCollection<Proveedores>;
  private proveedores: Observable<Proveedores[]>;

  getProveedores() {
    return this.proveedores = this.proveedoresCollection.snapshotChanges()
    .pipe(map( changes =>{
      return changes.map( action =>{
        const data = action.payload.doc.data() as Proveedores;
        data.IdProveedor = action.payload.doc.id;
        return data;
      });
    }));
  }

  getProveedor(IdProveedor : string) {
    return this.firestore.collection('proveedores').doc(IdProveedor).snapshotChanges();
  }

  createProveedor(proveedor : Proveedores) {
    return this.firestore.collection('proveedores').add(proveedor);
  }

  updateProveedor(proveedor : Proveedores) {
    const IdProveedor = proveedor.IdProveedor;
    this.firestore.doc('proveedores/' + IdProveedor).update(proveedor);
  }

  deleteProveedor( IdProveedor : string) {
    this.firestore.doc('proveedores/' + IdProveedor).delete();
  }
}
