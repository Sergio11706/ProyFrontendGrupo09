import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PagoService, CustomerInfo } from '../../../services/pago.service';
import { CarritoService } from '../../../services/carrito.service';
import { Combo } from '../../../models/combo.model';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  items: Combo[] = [];
  total = 0;
  loading = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private carritoService: CarritoService,
    private pagoService: PagoService,
    private router: Router
  ) {
    this.checkoutForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s()]+$/)]],
      direccion: ['', [Validators.required, Validators.minLength(10)]],
      codigoPostal: ['', [Validators.required, Validators.pattern(/^[0-9]{4}$/)]]
    });
  }

  ngOnInit(): void {
    this.carritoService.cargarDesdeLocalStorage();
    this.items = this.carritoService.getItems();
    this.total = this.carritoService.getTotal();
    
    if (this.items.length === 0) {
      this.router.navigate(['/productos']);
    }
  }

  onSubmit(): void {
    if (this.checkoutForm.valid && this.items.length > 0) {
      this.loading = true;
      this.errorMessage = '';

      const form = this.checkoutForm.value;
      const customerInfo: CustomerInfo = {
        nombre: form.nombre,
        email: form.email,
        telefono: form.telefono,
        direccion: form.direccion,
        codigoPostal: form.codigoPostal
      };

      this.pagoService.crearPreferencia(this.items, customerInfo).subscribe({
        next: (response) => {
          if (response && response.success && response.initPoint) {
            this.carritoService.clear();
            this.pagoService.redirectToMercadoPago(response.initPoint);
          } else {
            this.errorMessage = 'Error al procesar el pago';
            this.loading = false;
          }
        },
        error: (error) => {
          console.error('Error al procesar pago:', error);
          this.errorMessage = 'Error al procesar el pago. Inténtalo de nuevo.';
          this.loading = false;
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.checkoutForm.controls).forEach(key => {
      const control = this.checkoutForm.get(key);
      control?.markAsTouched();
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.checkoutForm.get(controlName);
    if (control?.errors && control.touched) {
      if (control.errors['required']) return 'Este campo es requerido';
      if (control.errors['email']) return 'Email inválido';
      if (control.errors['minlength']) return 'Mínimo 2 caracteres';
      if (control.errors['pattern']) {
        if (controlName === 'telefono') return 'Teléfono inválido';
        if (controlName === 'codigoPostal') return 'Código postal inválido (4 dígitos)';
      }
    }
    return '';
  }

  volverAlCarrito(): void {
    this.router.navigate(['/carrito']);
  }
}
