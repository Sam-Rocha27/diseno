import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestoreCollectionGroup } from '@angular/fire/firestore';
import { Ventas } from '../dashboard/modelos/ventas.model';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  constructor( private firestore:AngularFirestore ) { 
    this.ventasCollection = firestore.collection<Ventas>('ventas');
    this.ventas = this.ventasCollection.valueChanges();
  }

  private ventasCollection : AngularFirestoreCollection<Ventas>;
  private ventas: Observable<Ventas[]>;

  
  getVentas() {
    return this.ventas = this.ventasCollection.snapshotChanges()
    .pipe(map( changes =>{
      return changes.map( action =>{
        const data = action.payload.doc.data() as Ventas;
        data.IdVenta = action.payload.doc.id;
        return data;
      });
    }));
  }

  getVenta(IdVenta : string) {
    return this.firestore.collection('ventas').doc(IdVenta).snapshotChanges();
  }

  createVenta(venta : Ventas) {
    return this.firestore.collection('ventas').add(venta);
  }

  updateVenta(venta : Ventas) {
    const IdVenta = venta.IdVenta;
    this.firestore.doc('ventas/' + IdVenta).update(venta);
  }

  deleteVenta( IdVenta : string) {
    this.firestore.doc('ventas/' + IdVenta).delete();
  }
}
