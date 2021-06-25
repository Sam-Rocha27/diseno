import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestoreCollectionGroup } from '@angular/fire/firestore';
import { Citas } from '../dashboard/modelos/citas.model';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CitasService {

  constructor( private firestore:AngularFirestore) {
    this.citasCollection = firestore.collection<Citas>('citas');
    this.citas =  this.citasCollection.valueChanges();
   }
   
   private citasCollection : AngularFirestoreCollection<Citas>;
   private citas: Observable<Citas[]>;

   getCitas() {
     return this.citas = this.citasCollection.snapshotChanges()
     .pipe(map( changes =>{
       return changes.map( action=>{
         const data= action.payload.doc.data() as Citas;
         data.citasID = action.payload.doc.id;
         return data;
       });
     }));
   }

   getCita(citaID : string) {
     return this.firestore.collection('citas').doc(citaID).snapshotChanges();
   }

   createCita(cita: Citas) {
     return this.firestore.collection('citas').add(cita);
   }

   updateCita(cita: Citas) {
     const citaID = cita.citasID;
     this.firestore.doc('citas/' + citaID).update(cita);
   }

   deleteCita(citaID: string) { 
     this.firestore.doc('citas/' + citaID).delete();
   }
}
