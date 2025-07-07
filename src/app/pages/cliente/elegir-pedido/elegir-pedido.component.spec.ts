import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElegirPedidoComponent } from './elegir-pedido.component';

describe('ElegirPedidoComponent', () => {
  let component: ElegirPedidoComponent;
  let fixture: ComponentFixture<ElegirPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElegirPedidoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElegirPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
