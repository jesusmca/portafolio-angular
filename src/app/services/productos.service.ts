import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  producto: Producto[];
  productosFiltrados: Producto[] = [];

  constructor( private http: HttpClient ) {
    this.cargarProductos();
   }

  private cargarProductos(){

    return new Promise( ( resolve, reject ) => {

      this.http.get('https://angular-html-e6664.firebaseio.com/productos_idx.json')
                .subscribe( (resp: Producto[]) => {
                  console.log(resp);
                  this.producto = resp;
                  this.cargando = false;
                  resolve(); // Cuando se ejecuta el resolve means que se resolvio correctamente
                });
  
      });
  
  }

  getProductos( id: string ) {
    return this.http.get(`https://angular-html-e6664.firebaseio.com/productos/${ id }.json`);

  }

  buscarProducto( termino: string ) {

    if(this.producto.length === 0 ) {
        //cargar productos
        this.cargarProductos().then( () => {
          //ejecutar despues de tener los productos
          //aplicar filtro
          this.filtrarProductos( termino );
        });
    }else{
      //Aplicar el filtro
      this.filtrarProductos(termino);

    }
  

    console.log(this.productosFiltrados);
  }

  private filtrarProductos( termino: string ) {

    console.log(this.producto);
    this.productosFiltrados = [];

    termino = termino.toLocaleLowerCase();

    this.producto.forEach( prod => {
        
      const tituloLower = prod.titulo.toLocaleLowerCase();

      if ( prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0 ) {
        this.productosFiltrados.push( prod );
      }

    });
  }
}
