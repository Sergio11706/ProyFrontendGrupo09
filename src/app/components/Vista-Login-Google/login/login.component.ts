import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
declare const google: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  authForm: FormGroup;
  isLoginMode = true;
  showPassword = false;
  isLoading = false;

  constructor(private fb: FormBuilder) {
    this.authForm = this.createForm();
  }

  ngOnInit() {
    this.loadGoogleScript();
  }

  createForm(): FormGroup {
    return this.fb.group({
      firstName: [''],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  switchMode(event: Event) {
    event.preventDefault();
    this.isLoginMode = !this.isLoginMode;
    this.updateFormValidators();
  }

  updateFormValidators() {
    const firstNameControl = this.authForm.get('firstName');
    const lastNameControl = this.authForm.get('lastName');
    const addressControl = this.authForm.get('address');

    if (this.isLoginMode) {
      // Modo login: remover validadores para campos de registro
      firstNameControl?.clearValidators();
      lastNameControl?.clearValidators();
      addressControl?.clearValidators();
    } else {
      // Modo registro: agregar validadores
      firstNameControl?.setValidators([Validators.required]);
      lastNameControl?.setValidators([Validators.required]);
      addressControl?.setValidators([Validators.required]);
    }

    firstNameControl?.updateValueAndValidity();
    lastNameControl?.updateValueAndValidity();
    addressControl?.updateValueAndValidity();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.authForm.valid) {
      this.isLoading = true;
      
      const formData = this.authForm.value;
      
      // Simular llamada a API
      setTimeout(() => {
        if (this.isLoginMode) {
          console.log('Login data:', {
            email: formData.email,
            password: formData.password
          });
          alert('Login exitoso!');
        } else {
          console.log('Register data:', formData);
          alert('Registro exitoso!');
        }
        this.isLoading = false;
      }, 2000);
    } else {
      // Marcar todos los campos como touched para mostrar errores
      Object.keys(this.authForm.controls).forEach(key => {
        this.authForm.get(key)?.markAsTouched();
      });
    }
  }

  loadGoogleScript() {
    if (typeof google !== 'undefined') {
      this.initializeGoogleSignIn();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      this.initializeGoogleSignIn();
    };
    document.head.appendChild(script);
  }

  initializeGoogleSignIn() {
    google.accounts.id.initialize({
      client_id: 'TU_GOOGLE_CLIENT_ID_AQUI', // Reemplaza con tu Client ID
      callback: this.handleGoogleSignIn.bind(this)
    });

    google.accounts.id.renderButton(
      document.getElementById('google-signin-button'),
      {
        theme: 'outline',
        size: 'large',
        width: '100%',
        text: this.isLoginMode ? 'signin_with' : 'signup_with',
        shape: 'rectangular'
      }
    );
  }

  handleGoogleSignIn(response: any) {
    console.log('Google Sign-In response:', response);
    // Aquí procesarías el token JWT de Google
    // Decodificar el token y extraer la información del usuario
    alert('Login con Google exitoso!');
  }
}
