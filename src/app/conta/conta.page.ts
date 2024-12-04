import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, setDoc, doc } from 'firebase/firestore';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.page.html',
  styleUrls: ['./conta.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ContaPage {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  async onRegister(form: NgForm) {
    if (form.valid) {
      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'As senhas não coincidem!';
        return;
      }

      try {
        const auth = getAuth();
        const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);
        const user = userCredential.user;

        // Salvar informações adicionais do usuário no Firestore
        const firestore = getFirestore();
        await setDoc(doc(firestore, 'users', user.uid), {
          name: this.name,
          email: this.email,
        });

        this.router.navigate(['/profile']);  // Redirecionar para a página de perfil após cadastro bem-sucedido
      } catch (error: any) {
        this.errorMessage = 'Erro ao criar conta: ' + error.message;
      }
    }
  }
}
