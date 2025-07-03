import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCargaComponent } from './gestion-carga.component';

describe('GestionCargaComponent', () => {
  let component: GestionCargaComponent;
  let fixture: ComponentFixture<GestionCargaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionCargaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionCargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
