import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { PaqueteService } from './paquete.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})


export class AdminComponent implements OnInit{

  user = null;
  paquetesRef: AngularFireList<any>;
  paquetes: Observable<any[]>;

  articulosRef: AngularFireList<any>;
  articulos: Observable<any[]>;

  pack: any;
  packForm: FormGroup;

  constructor(private auth: AuthService, public db: AngularFireDatabase, private fb: FormBuilder, private packService: PaqueteService){
    //Paquetes
    this.paquetesRef = db.list('paquetes');
    this.paquetes = this.paquetesRef.snapshotChanges().pipe(
        map(changes => 
          changes.map(c => ({ key: c.payload.key, ...c.payload.val()}))
        )
    );
    //Aritulos
    this.articulosRef = db.list('/articulos');
    this.articulos = this.articulosRef.snapshotChanges().pipe(
        map(changes => 
          changes.map(c => ({ key: c.payload.key, ...c.payload.val()}))
        )
    );
  }

  ngOnInit(){
  	//obtiene estado del usuario
  	this.auth.getAuthState().subscribe((user) => this.user = user);
    this.packForm = this.fb.group({
      name:    ['', Validators.required ],
      desc:  ['', Validators.required ],
      price:    ['', Validators.required ],
      productos: this.fb.array([
      ]),
    });
  }

  //*************************************Formnulario
   startNewAdListing() {
    this.paquetesRef.push(this.packForm.value);
  }

  get productos(){
    return this.packForm.get('productos') as FormArray;
  }

  cambio(precio){
    console.log(precio);
  }

  addProducto() {
    const producto = this.fb.group({ 
      name: [],
      precio: [],
    })
    this.productos.push(producto);
  }

  private buildForm() {
    this.packForm = this.fb.group({
      name:    ['', Validators.required ],
      desc:  ['', Validators.required ],
      price:    ['', Validators.required ],
    });
  }

  updatePack(key: string, newName: string) {
    this.paquetesRef.update(key, {name: newName});
  }

  /**************************************************LOGIN*/
  loginWithGoogle(){
  	this.auth.loginWithGoogle();
  }

  login(email: string, pass: string){
    console.log(email,pass);
    this.auth.emailLogin(email, pass);
  }

  isLoggedIn(){
  	return this.auth.isLoggedIn();
  }

  logout(){
		this.auth.logout();
	}

  /**************************************************ADMIN*/
  addArt(name: string, precio:string){
    this.articulosRef.push({name, precio});
  }
  updateItem(key: string, newText: Array<string>) {
    this.paquetesRef.update(key, { newText });
  }
  deleteItem(key: string) {
    this.paquetesRef.remove(key);
  }
  deleteEverything() {
    this.paquetesRef.remove();
  }


  /*addPaq(articulo: string){
    console.log(articulo);
    return articulo; 
  }*/
  test(productos: Array<string>){
    console.log(productos)
    this.paquetesRef.push([productos]);
  } 
}
