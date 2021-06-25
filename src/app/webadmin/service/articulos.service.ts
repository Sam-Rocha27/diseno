import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestoreCollectionGroup } from '@angular/fire/firestore';
import { Articulos } from '../dashboard/modelos/articulos.model';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {

  constructor( private firestore:AngularFirestore ) {
    this.articulosCollection = firestore.collection<Articulos>('articulos');
    this.articulos = this.articulosCollection.valueChanges();
    }

    private articulosCollection : AngularFirestoreCollection<Articulos>;
    private articulos: Observable<Articulos[]>;

    getArticulos() {
      return this.articulos = this.articulosCollection.snapshotChanges()
      .pipe(map( changes =>{
        return changes.map( action =>{
          const data = action.payload.doc.data() as Articulos;
          data.IdArticulo = action.payload.doc.id;
          return data;
        });
      }));
    }

    getArticulo(IdArticulo : string){
      return this.firestore.collection('articulos').doc(IdArticulo).snapshotChanges();
    }

    createArticulo( articulo: Articulos){
      return this.firestore.collection('articulos').add(articulo);
    }

    updateArticulo( articulo: Articulos){
      const IdArticulo = articulo.IdArticulo;
      this.firestore.doc('articulos/' + IdArticulo).update(articulo);
    }

    deleteArticulo(IdArticulo: string){
      this.firestore.doc('articulos/' + IdArticulo).delete();
    }

}
