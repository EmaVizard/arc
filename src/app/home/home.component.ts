import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../shared/productos.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //Paquetes
	paquetesRef: AngularFireList<any>;
  paquetes: Observable<any[]>;
	//Articulos
  totalRef: AngularFireList<any>;
  totals: Observable<any[]>;

  constructor(public db: AngularFireDatabase) { 
  	//Paquetes
  	this.paquetesRef = db.list('paquetes');
    this.paquetes = this.paquetesRef.snapshotChanges().pipe(
        map(changes => 
          changes.map(c => ({ key: c.payload.key, ...c.payload.val()}))
        )
    );

    //Articulos
    this.articulosRef = db.list('articulos');
    this.articulos = this.articulosRef.snapshotChanges().pipe(
        map(changes => 
          changes.map(c => ({ key: c.payload.key, ...c.payload.val()}))
        )
    );
  }

  ngOnInit() {
  }

}
