import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { map } from 'rxjs/operators';

@Injectable()
export class ProductosService {
	
	//Paquetes
	itemsRef: AngularFireList<any>;
  	items: Observable<any[]>;
	//Articulos
  	totalRef: AngularFireList<any>;
  	totals: Observable<any[]>;

  constructor(public db: AngularFireDatabase) { 
  	//Paquetes
  	this.itemsRef = db.list('items');
    this.items = this.itemsRef.snapshotChanges().pipe(
        map(changes => 
          changes.map(c => ({ key: c.payload.key, ...c.payload.val()}))
        )
    );

    //Articulos
    this.totalRef = db.list('/');
    this.totals = this.totalRef.snapshotChanges().pipe(
        map(changes => 
          changes.map(c => ({ key: c.payload.key, ...c.payload.val()}))
        )
    );
  }


}
