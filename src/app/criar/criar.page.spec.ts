import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms'; // Para poder testar formulários
import { CriarPage } from './criar.page';

describe('CriarPage', () => {
  let component: CriarPage;
  let fixture: ComponentFixture<CriarPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CriarPage],
      imports: [IonicModule.forRoot(), FormsModule]  // Importando módulos necessários
    }).compileComponents();

    fixture = TestBed.createComponent(CriarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the page', () => {
    expect(component).toBeTruthy(); // Testa se a página foi criada com sucesso
  });

  describe('Testando o login', () => {
    it('should have username and password inputs', () => {
      const usernameInput = fixture.nativeElement.querySelector('#username');
      const passwordInput = fixture.nativeElement.querySelector('#password');
      expect(usernameInput).toBeTruthy(); // Testa se o campo de usuário está presente
      expect(passwordInput).toBeTruthy(); // Testa se o campo de senha está presente
    });

    it('should display error message if fields are empty on submit', () => {
      const form = fixture.nativeElement.querySelector('form');
      form.querySelector('button').click(); // Simula o clique no botão de login
      fixture.detectChanges();
      const errorMessage = fixture.nativeElement.querySelector('.error-message');
      expect(errorMessage).toBeTruthy(); // Verifica se a mensagem de erro aparece
    });
  });

  describe('Testando a recuperação de senha', () => {
    it('should display recover password form when link is clicked', () => {
      const recoverLink = fixture.nativeElement.querySelector('a.link');
      recoverLink.click(); // Simula o clique no link "Esqueceu a senha?"
      fixture.detectChanges();
      const recoverContainer = fixture.nativeElement.querySelector('.recover-container');
      expect(recoverContainer).toBeTruthy(); // Verifica se o formulário de recuperação aparece
    });

    it('should display error message if email is invalid on submit', () => {
      component.recoverEmail = ''; // Configura um e-mail vazio
      const recoverForm = fixture.nativeElement.querySelector('form');
      recoverForm.querySelector('button').click(); // Simula o clique no botão de enviar
      fixture.detectChanges();
      const errorMessage = fixture.nativeElement.querySelector('.error-message');
      expect(errorMessage).toBeTruthy(); // Verifica se a mensagem de erro aparece
    });
  });
});
