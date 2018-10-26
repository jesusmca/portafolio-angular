import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';
import { ProductoDesc } from '../../interfaces/producto-desc';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  producto: ProductoDesc;
  id: string;

  constructor( public route: ActivatedRoute,
               public productoService: ProductosService ) { }

  ngOnInit() {

    this.route.params
          .subscribe( parametros => {
            console.log(parametros['id']);

            this.productoService.getProductos( parametros['id'])
                                .subscribe( (producto: ProductoDesc) => {
                                  this.id = parametros['id'];
                                  // console.log(producto);
                                  this.producto = producto;
                                });
          });
  }

}
