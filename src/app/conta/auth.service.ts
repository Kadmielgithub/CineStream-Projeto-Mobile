import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from 'firebase/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User | null = null;
    current: any;

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.authState.subscribe(user => {
      this.current = user;
    });
  }

  async register(email: string, password: string, name: string) {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      // Salvar o nome do usuário no Firestore ou no próprio usuário
      await user?.updateProfile({ displayName: name });
      this.current = user;
      // Redirecionar ou fazer algo após o cadastro
    } catch (error) {
      console.log('Erro no cadastro', error);
    }
  }

  async login(email: string, password: string) {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
      this.current = userCredential.user;
      // Redirecionar ou fazer algo após o login
      this.router.navigate(['/home-def']);
    } catch (error) {
      console.log('Erro no login', error);
    }
  }

  logout() {
    this.afAuth.signOut();
    this.currentUser = null;
    this.router.navigate(['/login']);
  }

  getCurrentUser() {
    return this.currentUser;
  }
}

