import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

export class PaqueteListing {
	name = 'Nombre'
	desc = 'Descripción'
	price = '100'
}

@Injectable({
  providedIn: 'root'
})
export class PaqueteService {

  constructor(private db: AngularFireDatabase) { }

  /// Creates an Ad, then returns as an object
  createAd(): AngularFireObject<PaqueteListing> {
    const adDefault = new PaqueteListing()
    const adKey = this.db.list('/ads').push(adDefault).key
    return this.db.object('/ads/' + adKey)
  }


  /// Updates an existing Ad
  updateAd(ad: AngularFireObject<PaqueteListing>, data: any) {
    return ad.update(data)
  }
}
