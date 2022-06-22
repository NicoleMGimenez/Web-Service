import { Component, OnInit } from '@angular/core';
import { Transaccion } from 'src/app/models/transaccion';
import { DivisaService } from 'src/app/services/divisa.service';

@Component({
  selector: 'app-divisa',
  templateUrl: './divisa.component.html',
  styleUrls: ['./divisa.component.css']
})
export class DivisaComponent implements OnInit {

  transacciones: Array<Transaccion> = []
  transaccion!:Transaccion;
  origen: string = "";
  destino: string = "";

  divisas: Array<String> = [];

  band:boolean=true;
  band1:boolean=true;

  constructor(private divisaService: DivisaService) {
    this.obtenerTransacciones();
    //this.filtrar();
    this.obtenerDivisas();
   }

  ngOnInit(): void {
  }

  obtenerTransacciones(){
    this.divisaService.getTransacciones().subscribe(
      (result) => {
          result.forEach((element:any) => {
          this.transaccion = new Transaccion();
          Object.assign(this.transaccion, element)
          this.transacciones.push(this.transaccion);
        });
        console.log(this.transacciones, 'transacciones')
      },
      error => {alert("Error en la petición");}
    )
  }

  filtrar(){
    this.divisaService.filtrarTransacciones(this.origen,this.destino).subscribe(
      (result) => { //result puede ser cambiado por data - result me brinda las transacciones filtradas
        this.transacciones = [] // vacio el array que tenia con todas las transacciones
        console.log(this.transacciones, 'transacciones pasadas')
        Object.assign(this.transacciones, result) //al array vacio le asigno los resultados del filtro
        console.log(this.transacciones, 'filtradas')
      }
    )
  }

  obtenerDivisas() {
    this.divisaService.getDivisas().subscribe(
      (result) => {
        console.log(result);
        this.divisas = result;
      },
      error => { alert("Error en la petición"); }
    )
  }

  mostrarTodo(){
    window.location.reload()
  }

}
