import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Producto } from '../../models/producto';
import { ModalDialogService } from '../../services/modal-dialog.service';
import { ProductosService } from '../../services/productos.service';

enum Modo {
  consulta = 1,
  agregar
}

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  modo: Modo = Modo.consulta;
  formProducto: FormGroup;
  datosIncorrectos: boolean = false;

  constructor(
    private productosService: ProductosService,
    private fb: FormBuilder,
    private modalDialogService: ModalDialogService
  ) {}

  ngOnInit() {
    this.formProducto = this.fb.group({
      ProductoID: ['0'],
      ProductoNombre: ['', Validators.required],
      ProductoFechaAlta: [new Date(), Validators.required],
      ProductoStock: ['', Validators.required]
    });
    this.productosService.get().subscribe(r => {
      this.productos = r;
    });
  }

  cambiarModo(modo: string) {
    if (modo == 'agregar') {
      this.modo = Modo.agregar;
    } else if (modo == 'consultar') {
      this.modo = Modo.consulta;
    }
  }

  guardar() {
    if (this.formProducto.invalid) {
      this.datosIncorrectos = true;
      return;
    }
    this.productosService
      .post(this.formProducto.value)
      .subscribe((res: any) => {
        this.modalDialogService.Alert('Producto guardado correctamente');
        this.cambiarModo('consultar');
        this.ngOnInit();
      });
  }
}
