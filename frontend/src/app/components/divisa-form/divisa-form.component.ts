import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Transaccion } from 'src/app/models/transaccion';
import { DivisaService } from 'src/app/services/divisa.service';

@Component({
  selector: 'app-divisa-form',
  templateUrl: './divisa-form.component.html',
  styleUrls: ['./divisa-form.component.css']
})
export class DivisaFormComponent implements OnInit {

  value!: number;
  tipoA: string = "";
  tipoB: string = "";
  resultado!: any;
  resul!: number;

  transaccion!: Transaccion;
  band: boolean = false;

  divisas: Array<String> = [];

  constructor(private divisaServices: DivisaService) {
    this.obtenerDivisas();
    this.transaccion = new Transaccion();
    this.resetearForm;
  }

  ngOnInit(): void {
  }

  obtenerDivisas() {
    this.divisaServices.getDivisas().subscribe(
      (result) => {
        console.log(result);
        this.divisas = result;
      },
      error => { alert("Error en la petición"); }
    )
  }

  convertir() {
    this.value = this.transaccion.cantidadOrigen;
    this.tipoA = this.transaccion.monedaOrigen;
    this.tipoB = this.transaccion.monedaDestino;
    this.divisaServices.convertirDiv(this.value, this.tipoA, this.tipoB).subscribe(
      (result) => {
        console.log(result);
        result['rates'].forEach((element: any) => {
          console.log(element, 'bbbbb')
          console.log(Object.values(element), 'cccc')
          this.resultado = Object.values(element);
          console.log(this.resultado, 'resultado con value')
          this.resul = this.resultado[0];
          console.log(this.resul, 'resultado numero?')
          this.transaccion.cantidadDestino = this.resul;
          this.guardarConversion();
          console.log(this.transaccion.cantidadDestino, 'cant destino')
        });
      },
      error => { alert("Error en la petición, debes indicar que tipo de moneda vas a convertir"); }
    )
  }

  guardarConversion() {
    //this.transaccion.cantidadDestino = this.transaccion.cantidadOrigen * this.transaccion.tasaConversion
    // this.convertir();
    // this.transaccion.cantidadDestino = this.resul;
    // console.log(this.transaccion.cantidadDestino, 'cant destino', this.resul, 'resultado')
    // console.log(this.transaccion)
    this.divisaServices.createTransaccionNueva(this.transaccion).subscribe(
      (result) => {
        console.log(result, 'resultado');
      },
      error => {
        alert("Error en la petición"); 
      }
    )
    this.band = true
  }

  resetearForm(form: NgForm){
    form.reset();
  }
  
}
