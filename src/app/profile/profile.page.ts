import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ProfilePage {

  // Variáveis de erro
  errorMessage: string = '';
  loading: boolean = false;
  authService: any;

  constructor(private router: Router) {}

  login(email: string, password: string) {
    this.loading = true;
    this.errorMessage = ''; // Limpar mensagens de erro

    // Verificar se a senha tem mais de 6 caracteres
    if (password.length > 6) {
        this.loading = false;
        this.errorMessage = 'A senha deve ter no máximo 6 caracteres!';
        return;
    }

    const auth = getAuth();
    const firestore = getFirestore();

    // Realizar o login com email e senha
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Usuário logado:', user);

        // Salvar informações no Firestore
        const userDocRef = doc(firestore, 'users', user.uid);
        setDoc(userDocRef, {
          email: user.email,
          lastLogin: new Date(),
        })
          .then(() => {
            console.log('Dados do usuário adicionados ao Firestore');
            this.authService.currentUser = user;
            this.router.navigate(['/home-defer']);
          })
          .catch((error) => {
            console.error('Erro ao adicionar dados ao Firestore:', error);
            this.errorMessage = 'Erro ao salvar os dados no Firestore: ' + error.message;
            
          });

        this.loading = false;
        this.router.navigate(['/home-defer']);  // Redireciona para a página principal
      })
      .catch((error) => {
        this.loading = false;
        console.error('Erro de autenticação:', error.message); 
        this.errorMessage = 'Erro de autenticação: ' + error.message; 
        this.loading = false;
      });
  }
};
