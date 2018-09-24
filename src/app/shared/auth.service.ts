import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable()

export class AuthService {
  private authState: Observable<firebase.User>
  private currentUser: firebase.User = null;

constructor(public afAuth: AngularFireAuth) {
    this.authState = this.afAuth.authState;
    this.authState.subscribe(user => {
      if (user) {
        this.currentUser = user;
      } else {
        this.currentUser = null;
      }
    });
  }

	getAuthState() {
	  return this.authState;
	}

  	loginWithGoogle() {
	  return this.afAuth.auth.signInWithPopup(
	    new firebase.auth.GoogleAuthProvider());
	}

	emailLogin(email: string, password: string) {
  	  return this.afAuth.auth
  	    .signInWithEmailAndPassword(email, password)
  	    .catch(error => this.handleError(error));
  	}

	isLoggedIn(){
		if(this.currentUser == null){
			return false;
		}
		return true;
	}

	logout(){
		return this.afAuth.auth.signOut();
	}
  	private handleError(error: Error) {
  	  console.error(error);
  	}
}
