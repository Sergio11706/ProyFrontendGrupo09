import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Combo } from '../../models/combo.model';

@Component({
  selector: 'app-combo-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './combo-card.component.html',
  styleUrls: ['./combo-card.component.css']
})
export class ComboCardComponent {
  @Input() combo!: Combo;
  @Output() agregar = new EventEmitter<Combo>();

  agregarAlCarrito(): void {
    this.agregar.emit(this.combo);
  }
} 