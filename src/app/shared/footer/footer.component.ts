import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  anio: number = new Date().getFullYear();
  derechos: string = "JESER IT PORTAFOLIO";
  correo: string = "contacto@jeser-it.com.mx";

  constructor() { }

  ngOnInit() {
  }

}
